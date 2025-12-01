export async function up(queryInterface, Sequelize) {
  const carreras = [
    {
      id: "DS",
      nombre: "Desarrollo de Software",
      duracion_meses: 36,
      activo: true,
    },
    {
      id: "AF",
      nombre: "Análisis funcional",
      duracion_meses: 36,
      activo: true,
    },
    {
      id: "ITI",
      nombre: "Infraestructura en Tecnología de la información",
      duracion_meses: 36,
      activo: true,
    },
  ];

  return queryInterface.bulkInsert("carreras", carreras, {
    updateOnDuplicate: ["nombre", "duracion_meses", "activo"],
  });
}

export async function down(queryInterface, Sequelize) {
  const ids = ["DS", "AF", "ITI"];
  return queryInterface.bulkDelete("carreras", { id: ids });
}
