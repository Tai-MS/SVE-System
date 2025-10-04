import { sequelize } from "#db/connection"
import { Career } from "#components/Career/CareerModel"
import { DataTypes } from "sequelize"
import { applyAssociations } from "./associations"
import { Calificacion } from "#components/Calification/CalificationModel"
import { Asistencia } from "#components/ClassAttendance/ClassAttendanceModel"
import { Aula } from "#components/Classroom/ClassroomModel"
import { Clase } from "#components/ClassSession/ClassSessionModel"
import { ComisionUC } from "#components/ComisionUC/ComisionUCModel"
import { Comision } from "#components/Comision/ComisionModel"
import { UnidadCurricular, TipoUC } from "#components/CurricularUnit/CurricularUnitModel"
import { Material } from "#components/Material/MaterialModel"
import { Period } from "#components/Period/PeriodModel"
import Usuario, { Rol } from "#components/User/UserModel"
import UsuarioUnidadCurricular from "#components/UsuarioUC/UsuarioUC"
import connectSessionSequelize from "connect-session-sequelize"
import session from "express-session"
import Comunicado from "#components/Comunicados/comunicadosModel"
import Archivo from "#components/Archivos/archivosModel"
import UsuarioComision from "#components/UsuarioComision/UsuarioComisionModel"

const SequelizeStore = connectSessionSequelize(session.Store)
export const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: "sessions",
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000,
})

UnidadCurricular.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    nombre: { type: DataTypes.STRING(200), allowNull: false },
    carga_horaria: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    tipo_uc: { type: DataTypes.ENUM(...Object.values(TipoUC)), allowNull: false },
    carrera_id_fk: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "carreras",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "unidades_curriculares",
    indexes: [{ unique: true, fields: ["id", "nombre"] }],
  }
)

UsuarioComision.init(
  {
    anio_comision: { type: DataTypes.DATE, allowNull: false },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "usuarios",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    comision_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "comisiones",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "usuario_comision",
  }
)

UsuarioComision.init(
  {
    usuario_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: { model: "usuarios", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    comision_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      references: { model: "comisiones", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    anio_comision: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "usuario_comision",
    timestamps: false,
  }
)

Career.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    duracion_meses: { type: DataTypes.INTEGER, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, modelName: "Career", tableName: "carreras" }
)

Archivo.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ruta: { type: DataTypes.STRING, allowNull: false },
    modulo: {
      type: DataTypes.ENUM("Comunicado", "trabajoNoCalificado", "trabajoCalificado", "materialTrabajo"),
      allowNull: false,
    },
    moduloId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "archivos", timestamps: true, createdAt: "subido", updatedAt: "actulizado" }
)

Comunicado.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    id_usuario: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "usuarios", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    eliminado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    // UNA VEZ CREADO LOS CAMPOS DE DIVISIONES Y COMISIONES HACER LAS RELACIONES CON DICHAS TABLAS
    general: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
    division: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    id_comision: { type: DataTypes.UUID, allowNull: true, defaultValue: null },
  },
  {
    sequelize,
    tableName: "comunicados",
    timestamps: true,
    createdAt: "creado",
    updatedAt: "actualizado",
  }
)

Asistencia.init(
  {
    clase_id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true },
    alumno_id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true },
    presente: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { sequelize, tableName: "asistencias" }
)

Aula.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    activa: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: "aulas" }
)

ComisionUC.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    uc_id: { type: DataTypes.STRING, allowNull: false },
    comision_id: { type: DataTypes.BIGINT, allowNull: false },
    link_meet: { type: DataTypes.STRING, allowNull: true}
  },
  {
    sequelize,
    tableName: "comision_unidad_curricular",
  }
)

Comision.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    numero_comision: { type: DataTypes.STRING(20), allowNull: false },
    carrera_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "carreras",
        key: "id",
      },
    },
    cupo_maximo: { type: DataTypes.SMALLINT.UNSIGNED, defaultValue: 60 },
    cant_alumnos: { type: DataTypes.SMALLINT.UNSIGNED, defaultValue: 0 },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    sequelize,
    tableName: "comisiones",
    indexes: [{ unique: true, fields: ["numero_comision"] }],
  }
)

Material.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    comision_uc_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: "comision_unidad_curricular",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    titulo: { type: DataTypes.STRING(200), allowNull: false },
    url: { type: DataTypes.STRING(500), allowNull: true },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize, tableName: "materiales" }
)

Period.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
    fecha_fin: { type: DataTypes.DATEONLY, allowNull: false },
  },
  { sequelize, tableName: "periodos" }
)

Usuario.init(
  {
    id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false },
    dni: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    telefono: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    anioIngreso: { type: DataTypes.INTEGER, allowNull: false },
    rol: { type: DataTypes.ENUM(...Object.values(Rol)), allowNull: false },
    contraseña: { type: DataTypes.STRING(255), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    creado: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    ultima_conexion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    token: { type: DataTypes.STRING, allowNull: true },
    carrera_id_fk: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: "usuarios",
    timestamps: true,
    createdAt: "creado",
    updatedAt: "ultima_conexion",
    indexes: [
      {
        unique: true,
        fields: ["dni"],
        name: "unique_dni_index",
      },
    ],
  }
)

UsuarioUnidadCurricular.init(
  {
    usuario_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: { model: "usuarios", key: "id" },
    },
    unidad_curricular_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: { model: "unidades_curriculares", key: "id" },
    },
    comision_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      references: {model: "comisiones", key: "id"}
    }
  },
  {
    sequelize,
    tableName: "usuario_unidad_curricular",
    timestamps: false,
  }
)

Calificacion.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    comision_uc_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: "comision_unidad_curricular",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    alumno_id: { type: DataTypes.UUID, allowNull: false },
    instancia: { type: DataTypes.STRING(100), allowNull: false }, //osea, TP, parcial, trabajo en clase, etc.
    nota: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
    observaciones: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    sequelize,
    tableName: "calificaciones",
    indexes: [{ unique: true, fields: ["alumno_id", "instancia"] }],
  }
)
Clase.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    comision_uc_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: "comision_unidad_curricular",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    profesor_id: { type: DataTypes.UUID, allowNull: false },
    aula_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    modalidad: { type: DataTypes.ENUM("presencial", "virtual"), allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    hora_inicio: { type: DataTypes.TIME, allowNull: false },
    hora_fin: { type: DataTypes.TIME, allowNull: false },
    observaciones: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: "clases",
    indexes: [{ fields: ["fecha"] }],
  }
)

applyAssociations()
