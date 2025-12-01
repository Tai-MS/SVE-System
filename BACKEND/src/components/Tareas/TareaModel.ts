import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export class Tarea extends Model<InferAttributes<Tarea>, InferCreationAttributes<Tarea>>{
    declare id: CreationOptional<number>
    declare estudiante_id: string
    declare creado: Date
    declare modificado: CreationOptional<Date>
    declare material_id_fk: number
}