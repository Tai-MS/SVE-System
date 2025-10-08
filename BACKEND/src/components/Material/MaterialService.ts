import { MaterialAttributes } from './MaterialDTO';
import { Material } from './MaterialModel';

export class MateriaServices {
    crearMaterial = async (datos: MaterialAttributes) => {
        const t = await Material.sequelize!.transaction()
        try {
            
        } catch (error: any) {
            await t.rollback()
            return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar crear un material"}
        }
    }

    modificarMaterial = async (datos: Partial<MaterialAttributes>) => {
        const t = await Material.sequelize!.transaction()
        try {
            
        } catch (error: any) {
            await t.rollback()
            return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar modificar un material"}
        }
    }

    traerMaterial = async (id: number) => {
        try {
            
        } catch (error: any) {
            return { status: 500, respuesta: error.msg || "Ocurrio un error en el servidor al intentar traer un material"}
        }
    }
}