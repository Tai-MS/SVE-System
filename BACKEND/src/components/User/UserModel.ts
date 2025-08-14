import { Column, DataType, Model, Table } from "sequelize-typescript";

export enum Rol{
    ESTUDIANTE = "ESTUDIANTE",
    DIRECTIVO = "DIRECTIVO",
    ADMINISTRADOR = "ADMINISTRADOR",
    BEDELIA = "BEDELIA"
}
@Table({
    timestamps: true,
    tableName: "usuario",
    modelName: "Usuario"
})
class Usuario extends Model{
    static async encontrarPorDNI(dni: string) {
        return await Usuario.findOne({ 
            where: { dni } 
        });
    }

    static async encontrarPorEmail(email: string) {
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
        allowNull: true
    })
    declare contraseña: string

    @Column({
        type: DataType.STRING,
        allowNull: true
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
    declare rol: Rol

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

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare token: string
}

export default Usuario