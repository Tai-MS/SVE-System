export async function up(queryInterface, Sequelize) {
  const profesorId = "profesor"

  //Traer las UCs
  const unidades = await queryInterface.sequelize.query(`SELECT id FROM unidades_curriculares`, {
    type: queryInterface.sequelize.QueryTypes.SELECT,
  })

  //Recorre las Ucs para asignar el ID de cada una y una comision
  const comisionesUC = unidades.map((unidad, index) => ({
    uc_id: unidad.id,
    comision_id: (index % 27) + 1,
    link_meet: `https://meet.google.com/uc${index + 1}-com`,
    profesor_id: profesorId,
  }))

  return queryInterface.bulkInsert("comision_unidad_curricular", comisionesUC, {
    updateOnDuplicate: ["comision_id", "link_meet", "profesor_id"],
  })
}

export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("comision_unidad_curricular", {}, {})
}
