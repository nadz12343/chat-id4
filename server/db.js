const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "1234",
    database: "real-time chat",
    host: "localhost",
    port: 4321
})

module.exports = pool