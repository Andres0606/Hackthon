const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",            // tu usuario de PostgreSQL
  host: "localhost",           // o IP de tu servidor
  database: "Hackaton2.0", // nombre de tu BD
  password: "123",             // 👈 contraseña puesta directamente
  port: 5432,                  // puerto por defecto de PostgreSQL
});

pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error de conexión", err));

module.exports = pool;
