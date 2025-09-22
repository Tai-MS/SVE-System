import { sequelize } from "#db/connection";
import { Career } from "#components/Career/CareerModel";
import { DataTypes } from "sequelize";
import { applyAssociations } from "./associations";
import { Calificacion } from "#components/Calification/CalificationModel";
import { Asistencia } from "#components/ClassAttendance/ClassAttendanceModel";
import { Aula } from "#components/Classroom/ClassroomModel";
import { Clase } from "#components/ClassSession/ClassSessionModel";
import { ComisionUC } from "#components/ComisionUC/ComisionUCModel";
import { Comision } from "#components/Comission/ComissionModel";
import { UnidadCurricular, TipoUC } from "#components/CurricularUnit/CurricularUnitModel";
import { Material } from "#components/Material/MaterialModel";
import { Period } from "#components/Period/PeriodModel";
import Usuario, { Rol } from "#components/User/UserModel";
import UsuarioUnidadCurricular from "#components/UsuarioUC/UsuarioUC";
import { DataType } from "sequelize-typescript";
import { Profesor } from "#components/Profesor/ProfesorModel";

import connectSessionSequelize from "connect-session-sequelize"
import session from "express-session"

const SequelizeStore = connectSessionSequelize(session.Store)
export const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: "sessions",
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000,
  })

Career.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    duracion_meses: { type: DataTypes.INTEGER, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true }
  },
  { sequelize }
);

// Profesor.init(
//   {
//     id: {type: DataType.UUID, primaryKey: true},
//     nombre: { type: DataTypes.STRING(100), allowNull: false },
//     apellido: { type: DataTypes.STRING(100), allowNull: false },
//     dni: { type: DataTypes.STRING(20), allowNull: false, unique: true },
//     tel: { type: DataType.STRING, allowNull: true },
//     email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
//     contraseña: { type: DataTypes.STRING(255), allowNull: false },
//     estado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
//     creado: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
//     ultima_conexion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
//     token: { type: DataTypes.STRING, allowNull: true },
//   },
//   {
//     sequelize, tableName: "profesores"
//   }
// )

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
        id: {type: DataTypes.STRING, primaryKey: true},
        uc_id: {type: DataTypes.STRING, allowNull: false},
        comision_id: {type: DataTypes.BIGINT, allowNull: false}
    },
    {
        sequelize,
        tableName: "comision_unidad_curricular"
    }
)

Comision.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    numero_comision: { type: DataTypes.STRING(20), allowNull: false },
    cupo_maximo: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: true },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  },
  {
    sequelize,
    tableName: "comisiones",
    indexes: [{ unique: true, fields: ["numero_comision"] }],
  }
)


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
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    }
  },
  {
    sequelize,
    tableName: "unidades_curriculares",
    indexes: [{ unique: true, fields: ["id", "nombre"] }],
  }
)

Material.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    clase_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
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
    id: { primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false },
    dni: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    telefono: { type: DataType.STRING, allowNull: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    anioIngreso: { type: DataType.INTEGER, allowNull: false },
    rol: { type: DataTypes.ENUM(...Object.values(Rol)), allowNull: false },
    contraseña: { type: DataTypes.STRING(255), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    creado: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    ultima_conexion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    token: { type: DataTypes.STRING, allowNull: true },
    carrera_id_fk: {type: DataType.STRING, allowNull: true}//PONER FALSE
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
      type: DataTypes.STRING, 
      primaryKey: true, 
      references: { model: "usuarios", key: "id" } 
    },
    unidad_curricular_id: { 
      type: DataTypes.STRING, 
      primaryKey: true, 
      references: { model: "unidad_curricular", key: "id" } 
    },
  },
  {
    sequelize,
    tableName: "usuario_unidad_curricular",
    timestamps: false,
  }
);

Calificacion.init(
    {
        id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
        comision_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        alumno_id: { type: DataTypes.UUID, allowNull: false },
        instancia: { type: DataTypes.STRING(100), allowNull: false }, //osea, TP, parcial, trabajo en clase, etc.
        nota: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
        fecha: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
        observaciones: { type: DataTypes.STRING(255), allowNull: true },
    },
    {
        sequelize,
        tableName: "calificaciones",
        indexes: [{ unique: true, fields: ["comision_id", "alumno_id", "instancia"] }],
    }
)
Clase.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    unidad_curricular_id: { type: DataTypes.STRING, allowNull: false },
    comision_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
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