export async function up(queryInterface, Sequelize) {
  const usuarios = [
    {
      id: "estudiante",
      dni: "11111111",
      nombre: "ESTUDIANTE",
      apellido: "ESTUDIANTE",
      anioIngreso: 2025,
      email: "estudiante@estudiante.com",
      rol: "ESTUDIANTE",
      contraseña: "$2b$12$EKDG0A6two2fdseYuVDWhO5NLr3mrsudMncosxOAJEDx3RBnS76Eu",
    },
    {
      id: "profesor",
      dni: "22222222",
      nombre: "PROFESOR",
      apellido: "PROFESOR",
      anioIngreso: 2025,
      email: "profesor@profesor.com",
      rol: "PROFESOR",
      contraseña: "$2b$12$EKDG0A6two2fdseYuVDWhO5NLr3mrsudMncosxOAJEDx3RBnS76Eu",
    },
    {
      id: "bedelia",
      dni: "33333333",
      nombre: "BEDELIA",
      apellido: "BEDELIA",
      anioIngreso: 2025,
      email: "bedelia@bedelia.com",
      rol: "BEDELIA",
      contraseña: "$2b$12$EKDG0A6two2fdseYuVDWhO5NLr3mrsudMncosxOAJEDx3RBnS76Eu",
    },
    {
      id: "directivo",
      dni: "44444444",
      nombre: "DIRECTIVO",
      apellido: "DIRECTIVO",
      anioIngreso: 2025,
      email: "directivo@directivo.com",
      rol: "DIRECTIVO",
      contraseña: "$2b$12$EKDG0A6two2fdseYuVDWhO5NLr3mrsudMncosxOAJEDx3RBnS76Eu",
    },
    {
      id: "admin",
      dni: "55555555",
      nombre: "ADMIN",
      apellido: "ADMIN",
      anioIngreso: 2025,
      email: "admin@admin.com",
      rol: "ADMINISTRADOR",
      contraseña: "$2b$12$EKDG0A6two2fdseYuVDWhO5NLr3mrsudMncosxOAJEDx3RBnS76Eu",
    },
  ];

  return queryInterface.bulkInsert("usuarios", usuarios, {
    updateOnDuplicate: ["email", "rol", "contraseña"],
  });
}

export async function down(queryInterface, Sequelize) {
  const ids = ["estudiante", "profesor", "bedelia", "directivo", "admin"];
  return queryInterface.bulkDelete("usuarios", { id: ids });
}