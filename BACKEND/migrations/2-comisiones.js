module.exports = {
  up: async (queryInterface, Sequelize) => {
    const carreras = ["AF", "DS", "ITI"]
    const divisiones = [1, 2, 3]
    const comisiones = []

    const numeroComision = ["1ro", "2da", "3ra"]
    const anioCreacion = new Date().getFullYear()

    carreras.forEach((carrera_id) => {
      divisiones.forEach((division_id) => {
        numeroComision.forEach((num_com, idx) => {
          comisiones.push({
            numero_comision: num_com,
            carrera_id,
            cupo_maximo: 60,
            cant_alumnos: 0,
            activo: true,
            anio_creacion: anioCreacion,
            division_id,
          })
        })
      })
    })

    return queryInterface.bulkInsert("comisiones", comisiones, {
      updateOnDuplicate: [
        "cupo_maximo",
        "cant_alumnos",
        "activo",
        "anio_creacion",
        "division_id",
        // agrega campos que quieras actualizar si ya existe el registro
      ],
    })
  },

  down: async (queryInterface, Sequelize) => {
    const carreras = ["AF", "DS", "ITI"]
    const divisiones = [1, 2, 3]
    const numeroComision = ["1ro", "2da", "3ra"]

    // Remove only the inserted records
    return queryInterface.bulkDelete(
      "comisiones",
      {
        carrera_id: carreras,
        division_id: divisiones,
        numero_comision: numeroComision,
      },
      {}
    )
  },
}
