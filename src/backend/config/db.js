const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",       // 👈 tu usuario PostgreSQL
  host: "localhost",      // 👈 servidor BD
  database: "Hackaton2.0",// 👈 nombre BD
  password: "123",        // 👈 tu contraseña fija
  port: 5432,
});

pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error de conexión", err));

module.exports = pool;
