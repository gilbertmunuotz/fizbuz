// *** Import NPM Packages *** //
import { DataTypes } from "sequelize";
import sequelize from "../utilities/sequelize";
import User from './User';

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
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users', // refers to table name 'users'
      key: 'id'
    }
  }
},

  // Sequelize will automatically manage createdAt and updatedAt
  { timestamps: true }

);

// Define the relationship (A user can have many transactions)
User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });


// **** Export default **** //
export default Transaction;