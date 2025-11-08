export async function up(queryInterface, Sequelize) {
  const unidades = [
    {
      id: "UC1",
      nombre: "Programación I",
      carga_horaria: 6,
      activo: true,
      carrera_id_fk: "DS",
      tipo_uc: "MATERIA",
    },
    {
      id: "UC2",
      nombre: "Taller de Software",
      carga_horaria: 4,
      activo: true,
      carrera_id_fk: "DS",
      tipo_uc: "TALLER",
    },
    {
      id: "UC3",
      nombre: "Laboratorio de Hardware",
      carga_horaria: 3,
      activo: true,
      carrera_id_fk: "ITI",
      tipo_uc: "LABORATORIO",
    },
    {
      id: "UC4",
      nombre: "Práctica Profesionalizante I",
      carga_horaria: 8,
      activo: true,
      carrera_id_fk: "AF",
      tipo_uc: "PRACTICA PROFESIONALIZANTE",
    },
  ];

  return queryInterface.bulkInsert("unidades_curriculares", unidades, {
    updateOnDuplicate: [
      "nombre",
      "carga_horaria",
      "activo",
      "carrera_id_fk",
      "tipo_uc",
    ],
  });
}

export async function down(queryInterface, Sequelize) {
  const nombres = [
    "Programación I",
    "Taller de Software",
    "Laboratorio de Hardware",
    "Práctica Profesionalizante I",
  ];

  return queryInterface.bulkDelete(
    "unidadescurriculares",
    { nombre: nombres },
    {}
  );
}
