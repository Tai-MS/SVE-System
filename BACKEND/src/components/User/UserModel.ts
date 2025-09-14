import { DataTypes, InferAttributes, Model, Optional } from "sequelize"
import { sequelize } from "#db/connection"
import { AllowNull, DataType } from "sequelize-typescript"
import { usuarioI } from "./UserDTO"
import { UnidadCurricular } from "#components/CurricularUnit/CurricularUnitModel"
import { Career } from "#components/Career/CareerModel"
import UsuarioUnidadCurricular from "#components/UsuarioUC/UsuarioUC"

export enum Rol {
  ESTUDIANTE = "ESTUDIANTE",
  DIRECTIVO = "DIRECTIVO",
  ADMINISTRADOR = "ADMINISTRADOR",
  BEDELIA = "BEDELIA",
}

export type UserCreation = Optional<usuarioI, "id">

class Usuario extends Model<InferAttributes<Usuario>, UserCreation> implements usuarioI {
  declare id: number
  declare nombre: string
  declare apellido: string
  declare dni: string
  declare telefono: string
  declare anioIngreso: number
  declare email: string
  declare rol: Rol
  declare contraseña: string
  declare activo: boolean
  declare creado: Date
  declare ultima_conexion: Date
  declare token: string
  declare carrera_id_fk: string

  static async encontrarPorDNI(dni: string) {
    return await Usuario.findOne({
      where: { dni },
    })
  }

  static async encontrarPorEmail(email: string) {
    return await Usuario.findOne({
      where: { email },
    })
  }
}

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

Usuario.belongsToMany(UnidadCurricular, {
  through: UsuarioUnidadCurricular,
  foreignKey: "usuario_id",
  otherKey: "unidad_curricular_id",
});

UnidadCurricular.belongsToMany(Usuario, {
  through: UsuarioUnidadCurricular,
  foreignKey: "unidad_curricular_id",
  otherKey: "usuario_id",
});

Career.hasMany(Usuario, {
  foreignKey: "carrera_id_fk"
})
Usuario.belongsTo(Career, {
  foreignKey: "carrera_id_fk"
})

export default Usuario
