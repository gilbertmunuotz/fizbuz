// *** Import NPM Packages *** //
import { DataTypes } from "sequelize";
import sequelize from "../utilities/sequelize";


// **** Functions **** //
const transaction = sequelize.define('transactions', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  type: {
    type: DataTypes.NUMBER,
    allowNull: false
  },

  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});


// **** Export default **** //
export default {transaction};