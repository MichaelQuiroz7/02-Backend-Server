import { DataTypes } from 'sequelize';
import sequelize from '../Db/connection';

export const Role = sequelize.define('Role', {
    nRoleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sName: {
        type: DataTypes.STRING(100)
    }
});

export const User = sequelize.define('User', {
    nIdUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sNameUser: {
        type: DataTypes.STRING
    },
    sLastNameUser: {
        type: DataTypes.STRING(100)
    },
    sEmail: {
        type: DataTypes.STRING(100),
        unique: true
    },
    sPassword: {
        type: DataTypes.STRING(100)
    },
    sAddressUser: {
        type: DataTypes.STRING(200)
    },
    nRoleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'nRoleId'
        }
    },
    sPhoneNumber: {
        type: DataTypes.STRING(10)
    }
}, {
    timestamps: true // Omite la creación de las columnas createdAt y updatedAt si el valor es falso
});

