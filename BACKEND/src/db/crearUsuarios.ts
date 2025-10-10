// import Usuario from "#components/User/UserModel"
// import { clearDB } from "./connection"
// export const crearUsuarios = async () => {
//   try {
//     // await clearDB()

//     await Usuario.bulkCreate([
//       {
//         dni: "11111111",
//         nombre: "ESTUDIANTE",
//         apellido: "ESTUDIANTE",
//         anioIngreso: 2025,
//         email: "11111111@estudiante.com",
//         rol: "ESTUDIANTE",
//         contraseña: "$2b$12$EKDG0A6two2fdseYuVDWhO5NLr3mrsudMncosxOAJEDx3RBnS76Eu",
//       },
//       {
//         dni: "22222222",
//         nombre: "PROFESOR",
//         apellido: "PROFESOR",
//         anioIngreso: 2025,
//         email: "22222222@profesor.com",
//         rol: "PROFESOR",
//         contraseña: "$2b$12$EKDG0A6two2fdseYuVDWhO5NLr3mrsudMncosxOAJEDx3RBnS76Eu",
//       },
//       {
//         dni: "33333333",
//         nombre: "BEDELIA",
//         apellido: "BEDELIA",
//         anioIngreso: 2025,
//         email: "33333333@bedelia.com",
//         rol: "BEDELIA",
//         contraseña: "$2b$12$EKDG0A6two2fdseYuVDWhO5NLr3mrsudMncosxOAJEDx3RBnS76Eu",
//       },
//       {
//         dni: "44444444",
//         nombre: "DIRECTIVO",
//         apellido: "DIRECTIVO",
//         anioIngreso: 2025,
//         email: "44444444@directivo.com",
//         rol: "DIRECTIVO",
//         contraseña: "$2b$12$EKDG0A6two2fdseYuVDWhO5NLr3mrsudMncosxOAJEDx3RBnS76Eu",
//       },
//       {
//         dni: "55555555",
//         nombre: "ADMIN",
//         apellido: "ADMIN",
//         anioIngreso: 2025,
//         email: "55555555@admin.com",
//         rol: "ADMINISTRADOR",
//         contraseña: "$2b$12$EKDG0A6two2fdseYuVDWhO5NLr3mrsudMncosxOAJEDx3RBnS76Eu",
//       },
//     ])
//     return console.log("Usuarios con permisos cargados correctamente")
//   } catch (err) {
//     return console.log("Ocurrio un error al momento de cargar los usuarios con permisos")
//   }
// }