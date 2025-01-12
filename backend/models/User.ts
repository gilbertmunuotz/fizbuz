import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utilities/sequelize";

// Define UserAttributes interface
export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    otp?: string;
    otpExpiresAt?: string;
    ipAddress?: string;
    userAgent?: string;
}

// Optional fields for creating a user
type UserCreationAttributes = Optional<UserAttributes, 'id' | 'name' | 'otp' | 'otpExpiresAt'>;

// Define the User model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public otp?: string;
    public otpExpiresAt?: string;
    public ipAddress?: string;
    public userAgent?: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otp: {
            type: DataTypes.STRING(6),
            allowNull: true,
        },
        otpExpiresAt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ipAddress: {
            type: DataTypes.STRING,
        },
        userAgent: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
    }
);

export default User;