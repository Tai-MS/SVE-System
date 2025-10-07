// import express, { NextFunction, Request, Response } from 'express'
// import carreraController from '#components/Career/CarreraController'
// import CurricularUnitController from '#components/CurricularUnit/CurricularUnitController'
// import userController from '#components/User/UserController'
// import upload from '#Utils/multer'
// import CommissionController from '#components/Comission/CommissionController'

// const router = express.Router()

// //Carrera
// router.put("/modificarCarrera", carreraController.modificarCarrera)

// //Unidad Curricular
// router.post("/crearUc", CurricularUnitController.crearUc)
// router.put("/modificarUc", CurricularUnitController.modificarUc)
// router.delete("/eliminaruc", CurricularUnitController.eliminarUc)

// //Usuario
// router.post("/crearUsuario", userController.crearUsuario)
// router.put("/actualizar", userController.actualizarUsuario)
// router.put("/incluirEnUC", userController.incluirEnUC)
// router.post("/public/importarAlumnos", upload.single("file"), userController.ImportarAlumnos)

// //Comision
// router.post('/crearcomision', CommissionController.crearComision)
// router.put('/modificarcomision', CommissionController.modificarComision)


// export default router