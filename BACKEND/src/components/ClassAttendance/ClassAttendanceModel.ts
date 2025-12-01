import { InferAttributes, InferCreationAttributes, Model } from "sequelize"

export class Asistencia extends Model<InferAttributes<Asistencia>, InferCreationAttributes<Asistencia>> {
  declare clase_id: number
  declare alumno_id: string
  declare presente: boolean
}

/*


uc -> uc_comision -> materiales LISTO
uc -> uc_comision -> clase -> aulas LISTO
uc -> uc_comision -> calificaciones LISTO
uc -> uc_comision -> clase -> asistencias LISTO
usuarios -> u_comisiones -> comisiones LISTO


ELIMINAR RELACION USUARIO -> COMISION
ELIMINAR RELACION CLASES -> UC
ELIMINAR RELACION 
ELIMINAR RELACION 
*/
