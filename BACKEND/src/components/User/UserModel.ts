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
    tableName: "user",
    modelName: "User"
})
class User extends Model{
    static async findByEmail(email: string) {
        return await User.findOne({ 
            where: { email } 
        });
    }

    /**
     * DEJARLO ASI POR AHORA. 
     * PUEDE SERVIR PARA EL LOGIN DE GOOGLE
     */
    static async findByGoogleId(googleId: string){
        return await User.findOne({
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
    declare name: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare lastName: string

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
    declare role: Role

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    declare created_at: Date

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare google_id: string

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare last_connection: Date | null

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    declare status: true
}

export default User