import { Router } from "express"
import { AsistenciaControllers } from "./AsistenciaControllers"

const asistenciaControllers = new AsistenciaControllers()
const router = Router()

router.post("/guardarasistencia", asistenciaControllers.crearAsistencia)
router.get("/", asistenciaControllers.obtenerAsistenciasQuery)
router.get("/:id", asistenciaControllers.obtenerAsistenciaPorId)
router.put("/:id", asistenciaControllers.actualizarAsistencia)
router.delete("/:id", asistenciaControllers.eliminarAsistencia)

export default router
