import { DATE } from "sequelize";
import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";

enum Role{
    ESTUDIANTE,
    DIRECTIVO,
    ADMINISTRADOR,
    BEDELIA
}
@Table({
    timestamps: true,
    tableName: "usuario",
    modelName: "Usuario"
})
class Usuario extends Model{
    static async findByEmail(email: string) {
        return await Usuario.findOne({ 
            where: { email } 
        });
    }

    /**
     * DEJARLO ASI POR AHORA. 
     * PUEDE SERVIR PARA EL LOGIN DE GOOGLE
     */
    static async findByGoogleId(googleId: string){
        return await Usuario.findOne({
            where: {googleId}
        })
    }

    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare googleId: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare email: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare nombre: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare apellido: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare dni: string

    @Column({
        type: DataType.ENUM("ESTUDIANTE", "DIRECTIVO", "ADMINISTRADOR", "BEDELIA"),
        allowNull: false
    })
    declare rol: Role

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    declare creado: Date

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare google_id: string

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare ultima_conexion: Date | null

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    declare estado: true
}

export default Usuario