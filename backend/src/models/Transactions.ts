// *** Import NPM Packages *** //
import { DataTypes } from "sequelize";
import sequelize from "../utilities/sequelize";

// **** Functions **** //
// Define the model
const Transaction = sequelize.define('transactions', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
},

  // Sequelize will automatically manage createdAt and updatedAt
  { timestamps: true }

);


// **** Export default **** //
export default Transaction;