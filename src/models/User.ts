import { sequelize } from "../instances/mysql";
import {Model, DataTypes} from 'sequelize';

interface UserInstance extends Model{
    id: number,
    nome: string,
    idade: number
}

export const User = sequelize.define<UserInstance>("User",{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nome:{
        type: DataTypes.STRING
    },
    idade: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'users',
    timestamps: false
})