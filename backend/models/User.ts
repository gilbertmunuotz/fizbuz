// *** Import NPM Packages *** //
import { DataTypes } from "sequelize";
import sequelize from "../utilities/sequelize";

// **** Functions **** //
// Define the models
const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},

    // Sequelize will automatically manage createdAt and updatedAt
    { timestamps: true }

);


// **** Export default **** //
export default User;