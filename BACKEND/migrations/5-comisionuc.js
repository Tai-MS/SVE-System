export async function up(queryInterface, Sequelize) {
  //SE TIENE Q MODIFICAR profesor_id POR EL ID DE UN PROFESOR EN LA DB
  const comisionesUC = [
    {
      uc_id: "UC1",
      comision_id: 1,
      link_meet: "https://meet.google.com/uc1-com1",
      profesor_id: "41468ff4-77c0-4e67-bd4e-1a7221e2a55d"
    },
    {
      uc_id: "UC2",
      comision_id: 2,
      link_meet: "https://meet.google.com/uc2-com2",
      profesor_id: "41468ff4-77c0-4e67-bd4e-1a7221e2a55d"
    },
    {
      uc_id: "UC3",
      comision_id: 3,
      link_meet: "https://meet.google.com/uc3-com3",
      profesor_id: "41468ff4-77c0-4e67-bd4e-1a7221e2a55d"
    },
    {
      uc_id: "UC4",
      comision_id: 4,
      link_meet: null,
      profesor_id: "41468ff4-77c0-4e67-bd4e-1a7221e2a55d"
    },
  ];

  return queryInterface.bulkInsert("comision_unidad_curricular", comisionesUC, {
    updateOnDuplicate: ["uc_id", "comision_id", "link_meet"],
  });
}

export async function down(queryInterface, Sequelize) {
  const ucIds = ["UC1", "UC2", "UC3", "UC4"];
  const comisionIds = [1, 2, 3, 4];

  return queryInterface.bulkDelete(
    "comision_uc",
    {
      uc_id: ucIds,
      comision_id: comisionIds,
    },
    {}
  );
}
