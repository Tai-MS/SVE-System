"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserta 3 divisiones con fechas de ejemplo
    await queryInterface.bulkInsert(
      "divisiones",
      [
        {
          fecha_inicio: "2025-01-01",
          fecha_fin: "2025-03-31",
        },
        {
          fecha_inicio: "2025-04-01",
          fecha_fin: "2025-06-30",
        },
        {
          fecha_inicio: "2025-07-01",
          fecha_fin: "2025-09-30",
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    // Elimina las divisiones insertadas
    await queryInterface.bulkDelete(
      "divisiones",
      {
        fecha_inicio: {
          [Sequelize.Op.in]: ["2025-01-01", "2025-04-01", "2025-07-01"],
        },
      },
      {}
    )
  },
}
