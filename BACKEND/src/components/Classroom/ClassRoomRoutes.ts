import { Router } from "express"
import { ClassRoomControllers } from "./ClassRoomController"

export const ClassRoomRouter = Router()
const ClassRoom = new ClassRoomControllers()

ClassRoomRouter.get("/:id", ClassRoom.traerAula)
ClassRoomRouter.post("/crear", ClassRoom.crearAula)
ClassRoomRouter.put("/modificar", ClassRoom.modificarAula)