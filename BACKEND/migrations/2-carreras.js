export async function up(queryInterface, Sequelize) {
  const carreras = [
    {
      id: "AF",
      nombre: "Analista Funcional de Sistemas",
      duracion_meses: 36,
      activo: true,
    },
    {
      id: "DS",
      nombre: "Desarrollador de Software",
      duracion_meses: 36,
      activo: true,
    },
    {
      id: "ITI",
      nombre: "Infraestructura de Tecnologías de la Información",
      duracion_meses: 36,
      activo: true,
    },
  ]

  // Insertar carreras
  return queryInterface.bulkInsert(
    "carreras",
    carreras.map((c) => ({
      ...c,
      activo: new Date(),
    })),
    {
      updateOnDuplicate: ["nombre", "duracion_meses", "activo"],
    }
  )
}

export async function down(queryInterface, Sequelize) {
  // Eliminar solo las carreras insertadas
  return queryInterface.bulkDelete("carreras", { id: ["AF", "DS", "ITI"] }, {})
}
