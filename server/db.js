const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "1234",
    database: "real-time chat",
    host: "localhost",
    port: 4321
    // password: 'zovbos-5dugxa-sYwmej',
    // database: 'postgres',
    // host: 'db.iqwckccxsmjgjfocdbqq.supabase.co',
    // port: 5432
})

module.exports = pool