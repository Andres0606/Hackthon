const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",       
  host: "localhost",      
  database: "Hackaton2.0",
  password: "123",       
  port: 5432,
});
//s
pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error de conexión", err));

module.exports = pool;
