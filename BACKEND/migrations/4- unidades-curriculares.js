import { DataTypes, Op } from "sequelize"
import { v4 as uuidv4 } from "uuid"

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
]

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
]

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
]

// ...
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("unidades_curriculares", {
      id: { type: Sequelize.STRING, primaryKey: true },
      carrera_id_fk: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: "carreras", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nombre: { type: Sequelize.STRING(200), allowNull: false },
      carga_horaria: { type: Sequelize.SMALLINT.UNSIGNED, allowNull: false },
      tipo_uc: {
        type: Sequelize.ENUM("MATERIA", "TALLER", "PRACTICA PROFESIONALIZANTE", "LABORATORIO"),
        allowNull: false,
      },
      activo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    })

    // ✅ Crear el índice solo si no existe
    const existing = await queryInterface.showIndex("unidades_curriculares")
    const hasUx = Array.isArray(existing) && existing.some((i) => i.name === "ux_uc_carrera_nombre")
    if (!hasUx) {
      await queryInterface.addIndex("unidades_curriculares", ["carrera_id_fk", "nombre"], {
        unique: true,
        name: "ux_uc_carrera_nombre",
      })
    }

    const now = new Date()
    const baseMATERIAsDS = MATERIAsDS.map((m) => ({
      ...m,
      carrera_id_fk: "DS",
      activo: true,
    }))
    const baseMATERIAsAF = MATERIAsAF.map((m) => ({
      ...m,
      carrera_id_fk: "AF",
      activo: true,
    }))
    const baseMATERIAsITI = MATERIAsITI.map((m) => ({
      ...m,
      carrera_id_fk: "ITI",
      activo: true,
    }))

    await queryInterface.bulkInsert("unidades_curriculares", baseMATERIAsDS)
    await queryInterface.bulkInsert("unidades_curriculares", baseMATERIAsAF)
    await queryInterface.bulkInsert("unidades_curriculares", baseMATERIAsITI)
  },

  down: async (queryInterface) => {
    const idsDS = MATERIAsDS.map((m) => m.id)
    const idsAF = MATERIAsAF.map((m) => m.id)
    const idsITI = MATERIAsITI.map((m) => m.id)

    await queryInterface.bulkDelete("unidades_curriculares", { id: { [Op.in]: idsDS } })
    await queryInterface.bulkDelete("unidades_curriculares", { id: { [Op.in]: idsAF } })
    await queryInterface.bulkDelete("unidades_curriculares", { id: { [Op.in]: idsITI } })

    // Remover índice si existe
    const existing = await queryInterface.showIndex("unidades_curriculares")
    const hasUx = Array.isArray(existing) && existing.some((i) => i.name === "ux_uc_carrera_nombre")
    if (hasUx) {
      await queryInterface.removeIndex("unidades_curriculares", "ux_uc_carrera_nombre")
    }

    await queryInterface.dropTable("unidades_curriculares")
  },
}
