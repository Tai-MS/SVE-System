export async function up(queryInterface, Sequelize) {
  //SE TIENE Q MODIFICAR profesor_id POR EL ID DE UN PROFESOR EN LA DB
  const comisionesUC = [
    {
      uc_id: "UC1",
      comision_id: 83,
      link_meet: "https://meet.google.com/uc1-com1",
      profesor_id: "16773549-e397-4a83-abae-3d32f848e01b",
    },
    {
      uc_id: "UC2",
      comision_id: 84,
      link_meet: "https://meet.google.com/uc2-com2",
      profesor_id: "16773549-e397-4a83-abae-3d32f848e01b",
    },
    {
      uc_id: "UC3",
      comision_id: 85,
      link_meet: "https://meet.google.com/uc3-com3",
      profesor_id: "16773549-e397-4a83-abae-3d32f848e01b",
    },
    {
      uc_id: "UC4",
      comision_id: 86,
      link_meet: null,
      profesor_id: "16773549-e397-4a83-abae-3d32f848e01b",
    },
  ]

  return queryInterface.bulkInsert("comision_unidad_curricular", comisionesUC, {
    updateOnDuplicate: ["uc_id", "comision_id", "link_meet"],
  })
}

export async function down(queryInterface, Sequelize) {
  const ucIds = ["UC1", "UC2", "UC3", "UC4"]
  const comisionIds = [1, 2, 3, 4]

  return queryInterface.bulkDelete(
    "comision_uc",
    {
      uc_id: ucIds,
      comision_id: comisionIds,
    },
    {}
  )
}
