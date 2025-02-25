import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

//Create an Instance of Sequelize ORM
const sequelize = new Sequelize(
    process.env.MYSQLDATABASE!,
    process.env.MYSQLUSER!,
    process.env.MYSQLPASSWORD!,
    {
        host: process.env.MYSQLHOST,
        dialect: 'mysql', // Use 'mysql' for both MySQL and MariaDB
        logging: true
    }
)

//Export Sequelize Configs
export default sequelize;