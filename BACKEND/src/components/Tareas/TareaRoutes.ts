import { Router } from "express"
import upload from "#Utils/multer"
import { TareaControllers } from "./TareaController"

export const TareaRouter = Router()
const Tarea = new TareaControllers()

