import { QueryInterface, DataTypes, Op } from "sequelize"
import { v4 as uuidv4 } from "uuid"
type TipoUC = "MATERIA" | "TALLER" | "PRACTICA PROFESIONALIZANTE" | "LABORATORIO"
type UCSeed = {
  carrera_id_fk: string
  nombre: string
  carga_horaria: number
  tipo_uc: TipoUC
  activo?: boolean
}
const MATERIAsDS = [
  { id: uuidv4(), nombre: "Comunicación", carga_horaria: 48, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "UDI 1", carga_horaria: 48, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Matemática", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Inglés Técnico 1", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Administración", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Tecnología de la Información", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Lógica y Estructura de Datos", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Ingeniería de Software", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Sistemas Operativos", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Problemáticas Socio Contemporáneas", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "UDI 2", carga_horaria: 48, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Inglés Técnico 2", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Innovación y Desarrollo Emprendedor", carga_horaria: 48, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Estadística", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Programación 1", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Ingeniería de Software 2", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Bases de Datos 1", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Práctica Profesionalizante 1", carga_horaria: 192, tipo_uc: "PRACTICA PROFESIONALIZANTE" },
  { id: uuidv4(), nombre: "Ética y Responsabilidad", carga_horaria: 48, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Derecho y Legislación Laboral", carga_horaria: 48, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Redes y Comunicación", carga_horaria: 128, tipo_uc: "LABORATORIO" },
  { id: uuidv4(), nombre: "Programación 2", carga_horaria: 128, tipo_uc: "MATERIA" },
  {
    id: uuidv4(),
    nombre: "Gestión de PRACTICA PROFESIONALIZANTEs de Software",
    carga_horaria: 128,
    tipo_uc: "MATERIA",
  },
  { id: uuidv4(), nombre: "Bases de Datos 2", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Práctica Profesionalizante 2", carga_horaria: 192, tipo_uc: "PRACTICA PROFESIONALIZANTE" },
] as const
const MATERIAsITI = [
  { id: uuidv4(), nombre: "Comunicación", carga_horaria: 48, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "UDI 1", carga_horaria: 48, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Matemática", carga_horaria: 128, tipo_uc: "MATERIA" },
  {
    id: uuidv4(),
    nombre: "Física Aplicada a las Tecnologías de la Información",
    carga_horaria: 96,
    tipo_uc: "MATERIA",
  },
  { id: uuidv4(), nombre: "Administración", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Inglés Técnico", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Arquitectura de las Computadoras", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Lógica y Programación", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Infraestructura de Redes 1", carga_horaria: 64, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Problemáticas Socio Contemporáneas", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "UDI 2", carga_horaria: 48, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Estadística", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Innovación y Desarrollo Emprendedor", carga_horaria: 48, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Sistemas Operativos", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Algoritmos y Estructura de Datos", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Bases de Datos 1", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Infraestructura de Redes 2", carga_horaria: 128, tipo_uc: "LABORATORIO" },
  { id: uuidv4(), nombre: "Práctica Profesionalizante 1", carga_horaria: 192, tipo_uc: "PRACTICA PROFESIONALIZANTE" },
  { id: uuidv4(), nombre: "Ética y Responsabilid", carga_horaria: 48, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Derecho y Legislación Laboral", carga_horaria: 48, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Administración de Bases de Datos", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Seguridad Sistemas", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Integridadción de Datos", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Administración de Sistemas Operativos y Redes", carga_horaria: 128, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Práctica Profesionalizante 2", carga_horaria: 256, tipo_uc: "PRACTICA PROFESIONALIZANTE" },
] as const
const MATERIAsAF = [
  { id: uuidv4(), nombre: "Comunicación", carga_horaria: 48, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "UDI 1", carga_horaria: 48, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Matemática", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Inglés Técnico 1", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Psicosociología de las Organizaciones", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Modelos de Negocios", carga_horaria: 96, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Arquitectura de las Computadoras", carga_horaria: 128, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Gestión de Software", carga_horaria: 128, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Análisis de Sistemas Organizacionales", carga_horaria: 160, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Problemáticas Socio Contemporáneas", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "UDI 2", carga_horaria: 48, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Inglés Técnico 2", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Estadística", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Innovación y Desarrollo Emprendedor", carga_horaria: 96, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Gestión de Software 2", carga_horaria: 128, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Estrategias de Negocios", carga_horaria: 128, tipo_uc: "PRACTICA PROFESIONALIZANTE" },
  { id: uuidv4(), nombre: "Desarrollo de Sistemas", carga_horaria: 160, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Práctica Profesionalizante 1", carga_horaria: 192, tipo_uc: "PRACTICA PROFESIONALIZANTE" },
  { id: uuidv4(), nombre: "Ética y Responsabilidad", carga_horaria: 48, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Derecho y Legislación Laboral", carga_horaria: 48, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Redes y Comunicaciones", carga_horaria: 128, tipo_uc: "LABORATORIO" },
  { id: uuidv4(), nombre: "Seguridad Sistemas", carga_horaria: 96, tipo_uc: "MATERIA" },
  { id: uuidv4(), nombre: "Bases de Datos", carga_horaria: 128, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Sistema de Información Organizacional", carga_horaria: 128, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Desarrollo de Sistemas Web", carga_horaria: 160, tipo_uc: "TALLER" },
  { id: uuidv4(), nombre: "Práctica Profesionalizante 2", carga_horaria: 192, tipo_uc: "PRACTICA PROFESIONALIZANTE" },
] as const
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("unidades_curriculares", {
      id: { type: DataTypes.STRING, primaryKey: true },
      carrera_id_fk: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: "carreras", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nombre: { type: DataTypes.STRING(200), allowNull: false },
      carga_horaria: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
      tipo_uc: {
        type: DataTypes.ENUM("MATERIA", "TALLER", "PRACTICA PROFESIONALIZANTE", "LABORATORIO"),
        allowNull: false,
      },
      activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      // created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      // updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    })

    const now = new Date()

    const baseMATERIAsITI: UCSeed[] = MATERIAsITI.map<UCSeed>((m) => ({
      ...m,
      carrera_id_fk: "ITI",
      activo: true,
      // created_at: now,
      // updated_at: now,
    }))
    const baseMATERIAsAF: UCSeed[] = MATERIAsAF.map<UCSeed>((m) => ({
      ...m,
      carrera_id_fk: "AF",
      activo: true,
      // created_at: now,
      // updated_at: now,
    }))

    const baseMATERIAsDS: UCSeed[] = MATERIAsDS.map<UCSeed>((m) => ({
      ...m,
      carrera_id_fk: "DS",
      activo: true,
      // created_at: now,
      // updated_at: now,
    }))
    await queryInterface.bulkInsert("unidades_curriculares", baseMATERIAsDS)
    await queryInterface.bulkInsert("unidades_curriculares", baseMATERIAsAF)
    await queryInterface.bulkInsert("unidades_curriculares", baseMATERIAsITI)
  },

  down: async (queryInterface: QueryInterface) => {
    const nombresDS = MATERIAsDS.map((m) => m.nombre)
    const nombresAF = MATERIAsAF.map((m) => m.nombre)
    const nombresITI = MATERIAsITI.map((m) => m.nombre)

    await queryInterface.bulkDelete("unidades_curriculares", {
      carrera_id_fk: "DS",
      nombre: { [Op.in]: nombresDS },
    })

    await queryInterface.bulkDelete("unidades_curriculares", {
      carrera_id_fk: "AF",
      nombre: { [Op.in]: nombresAF },
    })

    await queryInterface.bulkDelete("unidades_curriculares", {
      carrera_id_fk: "ITI",
      nombre: { [Op.in]: nombresITI },
    })

    await queryInterface.dropTable("unidades_curriculares")
  },
}

//Esta migracion se corre con el siguiente comando:
//npx sequelize-cli db:migrate --env dev --name 20250908221155-CU.ts
