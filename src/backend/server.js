import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRouters.js";
import empresaRouter from "./routes/empresaRouter.js";
import pool from "./config/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// 🔌 Conexión con PostgreSQL
pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error de conexión a PostgreSQL:", err));

// Rutas
app.use("/api/users", userRouter);
app.use("/api/empresas", empresaRouter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
