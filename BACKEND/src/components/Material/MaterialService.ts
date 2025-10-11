import { ComisionUC } from '#components/ComisionUC/ComisionUCModel';
import { MaterialAttributes } from './MaterialDTO';
import { Material, TipoMaterial } from './MaterialModel';

export class MateriaServices {
    crearMaterial = async (datos: MaterialAttributes) => {
        const t = await Material.sequelize!.transaction()
        try {
            const uc = await ComisionUC.findByPk(datos.comision_uc_id)

            if(!uc){
                return {status: 404, respuesta: "Error. Comision o Unidad Curricular incorrectas"}
            }

            datos = {
                ...datos,
                creado: new Date()
            }

            const material = await Material.create(datos, { transaction: t})
            t.commit()
            return { status: 203, respuesta: material}
        } catch (error: any) {
            await t.rollback()
            return { status: 500, respuesta: error.message || "Ocurrio un error en el servidor al intentar crear un material"}
        }
    }

    modificarMaterial = async (id: number, datos: Partial<MaterialAttributes>) => {
    const t = await Material.sequelize!.transaction()
    try {

        const material = await Material.findByPk(id)

        if (!material) {
            return { status: 404, respuesta: "No se encontró el material" }
        }

        await material.update(
            {
                ...datos
            },
            { transaction: t }
        )

        await t.commit()
        return { status: 200, respuesta: material }
        } catch (error: any) {
            await t.rollback()
            
            return { status: 500, respuesta: error.msg || "Ocurrió un error en el servidor al intentar modificar el material" }
        }
    }


    traerMaterial = async (id: number) => {
        try {
            const material = await Material.findByPk(id)
            
            if (!material) {
                return { status: 404, respuesta: "No se encontró el material solicitado" }
            }

            return { status: 200, respuesta: material }
        } catch (error: any) {
            return { status: 500, respuesta: error.msg || "Ocurrió un error en el servidor al intentar traer el material" }
        }
    }


    traerTodosMateriales = async () => {
        try {
            
            const materiales = await Material.findAll()
            
            if (!materiales) {
                return { status: 404, respuesta: "No se encontraron materiales" }
            }

            return { status: 200, respuesta: materiales }
        } catch (error: any) {
            return { status: 500, respuesta: error.message || "Ocurrió un error en el servidor al intentar traer los materiales" }
        }
    }
}