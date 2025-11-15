const { v4: uuidv4 } = require("uuid")

// IDs de comisiones (3 por división)
const COMISIONES = {
  division1: [1, 2, 3],
  division2: [1, 2, 3],
  division3: [1, 2, 3],
}

const now = new Date()

// Comunicados generales
const COMUNICADOS_GENERALES = [
  {
    id: uuidv4(),
    id_usuario: "directivo",
    titulo: "Inicio del Ciclo Lectivo 2025",
    descripcion:
      "Estimados estudiantes, les informamos que el ciclo lectivo 2025 comenzará el día 15 de marzo. Les pedimos estar atentos a las comunicaciones institucionales.",
    eliminado: false,
    general: true,
    division: null,
    id_comision: null,
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "directivo",
    titulo: "Jornada de Puertas Abiertas",
    descripcion:
      "Se llevará a cabo una jornada de puertas abiertas el próximo sábado de 10 a 16hs. Invitamos a todos los interesados en conocer nuestra institución.",
    eliminado: false,
    general: true,
    division: null,
    id_comision: null,
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "directivo",
    titulo: "Suspensión de Actividades por Feriado",
    descripcion:
      "Les informamos que el próximo lunes no habrá actividades académicas por feriado nacional. Las clases se retomarán normalmente el martes.",
    eliminado: false,
    general: true,
    division: null,
    id_comision: null,
    creado: now,
    actualizado: now,
  },
]

const COMUNICADOS_POR_DIVISION = [
  {
    id: uuidv4(),
    id_usuario: "bedelia",
    titulo: "Reunión de Padres - División 1",
    descripcion:
      "Se convoca a los padres de la División 1 a una reunión informativa el día jueves 20 de marzo a las 18hs en el salón de actos.",
    eliminado: false,
    general: false,
    division: 1,
    id_comision: null,
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "bedelia",
    titulo: "Excursión Educativa - División 1",
    descripcion:
      "La División 1 realizará una excursión educativa al museo de ciencias el próximo viernes. Se requiere autorización firmada de los padres.",
    eliminado: false,
    general: false,
    division: 1,
    id_comision: null,
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "bedelia",
    titulo: "Cambio de Horario - División 2",
    descripcion:
      "A partir del próximo lunes, la División 2 tendrá un cambio en el horario de ingreso. Las clases comenzarán a las 8:30hs en lugar de las 8hs.",
    eliminado: false,
    general: false,
    division: 2,
    id_comision: null,
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "bedelia",
    titulo: "Entrega de Boletines - División 2",
    descripcion:
      "Los boletines del primer trimestre de la División 2 estarán disponibles para retiro en secretaría a partir del miércoles 25.",
    eliminado: false,
    general: false,
    division: 2,
    id_comision: null,
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "bedelia",
    titulo: "Proyecto Integrador - División 3",
    descripcion:
      "Los estudiantes de la División 3 deberán presentar el proyecto integrador antes del 30 de abril. Se adjunta rúbrica de evaluación.",
    eliminado: false,
    general: false,
    division: 3,
    id_comision: null,
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "bedelia",
    titulo: "Charla Orientación Vocacional - División 3",
    descripcion:
      "La División 3 tendrá una charla de orientación vocacional el próximo martes a cargo de profesionales de distintas áreas.",
    eliminado: false,
    general: false,
    division: 3,
    id_comision: null,
    creado: now,
    actualizado: now,
  },
]

// Comunicados por comisión
const COMUNICADOS_POR_COMISION = [
  {
    id: uuidv4(),
    id_usuario: "profesor",
    titulo: "Trabajo Práctico de Matemática - 1° Comisión A",
    descripcion:
      "Se asignó un nuevo trabajo práctico de Matemática para la Comisión A. Fecha de entrega: 15 de abril. Consultar material en el aula virtual.",
    eliminado: false,
    general: false,
    division: 1,
    id_comision: COMISIONES.division1[0],
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "profesor",
    titulo: "Recuperatorio de Física - 1° Comisión B",
    descripcion:
      "Se ha programado un recuperatorio de Física para la Comisión B el día viernes 22 a las 14hs en el laboratorio.",
    eliminado: false,
    general: false,
    division: 1,
    id_comision: COMISIONES.division1[1],
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "profesor",
    titulo: "Clase Especial de Programación - 1° Comisión C",
    descripcion:
      "La Comisión C tendrá una clase especial de Programación con un invitado externo el próximo miércoles. Asistencia obligatoria.",
    eliminado: false,
    general: false,
    division: 1,
    id_comision: COMISIONES.division1[2],
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "profesor",
    titulo: "Presentación de Proyectos - 2° Comisión A",
    descripcion:
      "La Comisión A deberá presentar sus proyectos finales el día lunes 28 de abril. Cada grupo dispondrá de 15 minutos para su exposición.",
    eliminado: false,
    general: false,
    division: 2,
    id_comision: COMISIONES.division2[0],
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "profesor",
    titulo: "Cambio de Aula - 2° Comisión B",
    descripcion:
      "A partir del martes, las clases de la Comisión B se dictarán en el aula 305 por refacciones en el aula habitual.",
    eliminado: false,
    general: false,
    division: 2,
    id_comision: COMISIONES.division2[1],
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "profesor",
    titulo: "Taller de Testing - 2° Comisión C",
    descripcion:
      "La Comisión C participará de un taller intensivo de testing de software los días 10 y 11 de mayo en el laboratorio de informática.",
    eliminado: false,
    general: false,
    division: 2,
    id_comision: COMISIONES.division2[2],
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "profesor",
    titulo: "Práctica Profesionalizante - 3° Comisión A",
    descripcion:
      "Los estudiantes de la Comisión A deberán confirmar su lugar de práctica profesionalizante antes del 5 de mayo en secretaría académica.",
    eliminado: false,
    general: false,
    division: 3,
    id_comision: COMISIONES.division3[0],
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "profesor",
    titulo: "Defensa de Tesis - 3° Comisión B",
    descripcion:
      "Se abre el calendario de defensas de tesis para la Comisión B. Los interesados deben inscribirse en el SIU Guaraní antes del 30 de abril.",
    eliminado: false,
    general: false,
    division: 3,
    id_comision: COMISIONES.division3[1],
    creado: now,
    actualizado: now,
  },
  {
    id: uuidv4(),
    id_usuario: "profesor",
    titulo: "Visita Técnica a Empresa - 3° Comisión C",
    descripcion:
      "La Comisión C realizará una visita técnica a una empresa del sector tecnológico el día 15 de mayo. Salida: 9hs desde la institución.",
    eliminado: false,
    general: false,
    division: 3,
    id_comision: COMISIONES.division3[2],
    creado: now,
    actualizado: now,
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comunicados", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      id_usuario: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "usuarios", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      eliminado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      general: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      division: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      id_comision: {
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: null,
      },
      creado: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      actualizado: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    })

    await queryInterface.bulkInsert("comunicados", COMUNICADOS_GENERALES)
    await queryInterface.bulkInsert("comunicados", COMUNICADOS_POR_DIVISION)
    await queryInterface.bulkInsert("comunicados", COMUNICADOS_POR_COMISION)
  },
  async down(queryInterface, Sequelize) {
    const idsGenerales = COMUNICADOS_GENERALES.map((c) => c.id)
    const idsDivision = COMUNICADOS_POR_DIVISION.map((c) => c.id)
    const idsComision = COMUNICADOS_POR_COMISION.map((c) => c.id)

    await queryInterface.bulkDelete("comunicados", {
      id: {
        [Sequelize.Op.in]: [...idsGenerales, ...idsDivision, ...idsComision],
      },
    })

    await queryInterface.dropTable("comunicados")
  },
}
