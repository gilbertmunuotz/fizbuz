import MySQL from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = MySQL.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    connectionLimit: 5, //Maximum number of connections the pool can maintain simultaneously
    waitForConnections: true,
    maxIdle: 5, //Maximum idle connections the pool can keep open
    idleTimeout: 60000, //Maximum time an idle connection can remain inactive within the pool before being destroyed
    queueLimit: 5, //Maximum number of connection requests the pool will queue when the limit is reached
});

// Export the connection pool object for usage
export default { pool };