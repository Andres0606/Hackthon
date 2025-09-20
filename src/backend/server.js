// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import bcrypt from "bcrypt";

const { Pool } = pkg; // Pool de PostgreSQL

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// conexión a PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Hackaton2.0",
  password: "123", // cámbialo por tu clave real
  port: 5432,
});

// ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// ruta de registro
app.post("/api/users/register", async (req, res) => {
  try {
    const { nombre, apellido, email, contrasena, telefono_usuario } = req.body;

    // validar campos obligatorios
    if (!nombre || !apellido || !email || !contrasena) {
      return res.status(400).json({ message: "Todos los campos obligatorios deben llenarse" });
    }

    // verificar si el usuario ya existe
    const checkUser = await pool.query(
      "SELECT * FROM Usuarios WHERE email = $1",
      [email]
    );

    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: "El usuario ya está registrado" });
    }

    // encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // insertar nuevo usuario
    const result = await pool.query(
      `INSERT INTO Usuarios (nombre, apellido, email, contrasena, telefono_usuario, rol)
       VALUES ($1, $2, $3, $4, $5, 'ciudadano') RETURNING id_usuario, nombre, email, rol`,
      [nombre, apellido, email, hashedPassword, telefono_usuario]
    );

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: result.rows[0],
    });

  } catch (error) {
    console.error("❌ Error en el registro:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
