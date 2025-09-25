import { QueryInterface, DataTypes, Op } from "sequelize"

type TipoUC = "Materia" | "Taller" | "Proyecto" | "Laboratorio"
type UCSeed = {
  carrera_id: string
  nombre: string
  carga_horaria: number
  tipo: TipoUC
  activo?: boolean
  created_at?: Date
  updated_at?: Date
}
const materiasDS = [
  { nombre: "Comunicación", carga_horaria: 48, tipo: "Taller" },
  { nombre: "UDI 1", carga_horaria: 48, tipo: "Taller" },
  { nombre: "Matemática", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Inglés Técnico 1", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Administración", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Tecnología de la Información", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Lógica y Estructura de Datos", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Ingeniería de Software", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Sistemas Operativos", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Problemáticas Socio Contemporáneas", carga_horaria: 96, tipo: "Materia" },
  { nombre: "UDI 2", carga_horaria: 48, tipo: "Taller" },
  { nombre: "Inglés Técnico 2", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Innovación y Desarrollo Emprendedor", carga_horaria: 48, tipo: "Materia" },
  { nombre: "Estadística", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Programación 1", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Ingeniería de Software 2", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Bases de Datos 1", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Práctica Profesionalizante 1", carga_horaria: 192, tipo: "Proyecto" },
  { nombre: "Ética y Responsabilidad Social", carga_horaria: 48, tipo: "Materia" },
  { nombre: "Derecho y Legislación Laboral", carga_horaria: 48, tipo: "Materia" },
  { nombre: "Redes y Comunicación", carga_horaria: 128, tipo: "Laboratorio" },
  { nombre: "Programación 2", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Gestión de Proyectos de Software", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Bases de Datos 2", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Práctica Profesionalizante 2", carga_horaria: 192, tipo: "Proyecto" },
] as const
const materiasITI = [
  { nombre: "Comunicación", carga_horaria: 48, tipo: "Materia" },
  { nombre: "UDI 1", carga_horaria: 48, tipo: "Taller" },
  { nombre: "Matemática", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Física Aplicada a las Tecnologías de la Información", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Administración", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Inglés Técnico", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Arquitectura de las Computadoras", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Lógica y Programación", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Infraestructura de Redes 1", carga_horaria: 64, tipo: "Materia" },
  { nombre: "Problemáticas Socio Contemporáneas", carga_horaria: 96, tipo: "Materia" },
  { nombre: "UDI 2", carga_horaria: 48, tipo: "Taller" },
  { nombre: "Estadística", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Innovación y Desarrollo Emprendedor", carga_horaria: 48, tipo: "Materia" },
  { nombre: "Sistemas Operativos", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Algoritmos y Estructura de Datos", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Bases de Datos 1", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Infraestructura de Redes 2", carga_horaria: 128, tipo: "Laboratorio" },
  { nombre: "Práctica Profesionalizante 1", carga_horaria: 192, tipo: "Proyecto" },
  { nombre: "Ética y Responsabilidad Social", carga_horaria: 48, tipo: "Materia" },
  { nombre: "Derecho y Legislación Laboral", carga_horaria: 48, tipo: "Materia" },
  { nombre: "Administración de Bases de Datos", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Seguridad de los Sistemas", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Integridad y Migración de Datos", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Administración de Sistemas Operativos y Redes", carga_horaria: 128, tipo: "Materia" },
  { nombre: "Práctica Profesionalizante 2", carga_horaria: 256, tipo: "Proyecto" },
] as const
const materiasAF = [
  { nombre: "Comunicación", carga_horaria: 48, tipo: "Taller" },
  { nombre: "UDI 1", carga_horaria: 48, tipo: "Materia" },
  { nombre: "Matemática", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Inglés Técnico 1", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Psicosociología de las Organizaciones", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Modelos de Negocios", carga_horaria: 96, tipo: "Taller" },
  { nombre: "Arquitectura de las Computadoras", carga_horaria: 128, tipo: "Taller" },
  { nombre: "Gestión de Software", carga_horaria: 128, tipo: "Taller" },
  { nombre: "Análisis de Sistemas Organizacionales", carga_horaria: 160, tipo: "Taller" },
  { nombre: "Problemáticas Socio Contemporáneas", carga_horaria: 96, tipo: "Materia" },
  { nombre: "UDI 2", carga_horaria: 48, tipo: "Materia" },
  { nombre: "Inglés Técnico 2", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Estadística", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Innovación y Desarrollo Emprendedor", carga_horaria: 96, tipo: "Taller" },
  { nombre: "Gestión de Software 2", carga_horaria: 128, tipo: "Taller" },
  { nombre: "Estrategias de Negocios", carga_horaria: 128, tipo: "Proyecto" },
  { nombre: "Desarrollo de Sistemas", carga_horaria: 160, tipo: "Taller" },
  { nombre: "Práctica Profesionalizante 1", carga_horaria: 192, tipo: "Proyecto" },
  { nombre: "Ética y Responsabilidad Social", carga_horaria: 48, tipo: "Materia" },
  { nombre: "Derecho y Legislación Laboral", carga_horaria: 48, tipo: "Materia" },
  { nombre: "Redes y Comunicaciones", carga_horaria: 128, tipo: "Laboratorio" },
  { nombre: "Seguridad de los Sistemas", carga_horaria: 96, tipo: "Materia" },
  { nombre: "Bases de Datos", carga_horaria: 128, tipo: "Taller" },
  { nombre: "Sistema de Información Organizacional", carga_horaria: 128, tipo: "Taller" },
  { nombre: "Desarrollo de Sistemas Web", carga_horaria: 160, tipo: "Taller" },
  { nombre: "Práctica Profesionalizante 2", carga_horaria: 192, tipo: "Proyecto" },
] as const
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("unidades_curriculares", {
      id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      carrera_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: { model: "carreras", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nombre: { type: DataTypes.STRING(200), allowNull: false },
      carga_horaria: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
      tipo: { type: DataTypes.ENUM("Materia", "Taller", "Proyecto", "Laboratorio"), allowNull: false },
      activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    })

    const now = new Date()

    const baseMateriasITI: UCSeed[] = materiasITI.map<UCSeed>((m) => ({
      ...m,
      carrera_id: "ITI",
      activo: true,
      created_at: now,
      updated_at: now,
    }))
    const baseMateriasAF: UCSeed[] = materiasAF.map<UCSeed>((m) => ({
      ...m,
      carrera_id: "AF",
      activo: true,
      created_at: now,
      updated_at: now,
    }))

    const baseMateriasDS: UCSeed[] = materiasDS.map<UCSeed>((m) => ({
      ...m,
      carrera_id: "DS",
      activo: true,
      created_at: now,
      updated_at: now,
    }))
    await queryInterface.bulkInsert("unidades_curriculares", baseMateriasDS)
    await queryInterface.bulkInsert("unidades_curriculares", baseMateriasAF)
    await queryInterface.bulkInsert("unidades_curriculares", baseMateriasITI)
  },

  down: async (queryInterface: QueryInterface) => {
    const nombresDS = materiasDS.map((m) => m.nombre)
    const nombresAF = materiasAF.map((m) => m.nombre)
    const nombresITI = materiasITI.map((m) => m.nombre)

    await queryInterface.bulkDelete("unidades_curriculares", {
      carrera_id: "DS",
      nombre: { [Op.in]: nombresDS },
    })

    await queryInterface.bulkDelete("unidades_curriculares", {
      carrera_id: "AF",
      nombre: { [Op.in]: nombresAF },
    })

    await queryInterface.bulkDelete("unidades_curriculares", {
      carrera_id: "ITI",
      nombre: { [Op.in]: nombresITI },
    })

    await queryInterface.dropTable("unidades_curriculares")
  },
}

//Esta migracion se corre con el siguiente comando:
//npx sequelize-cli db:migrate --env dev --name 20250908221155-CU.ts
