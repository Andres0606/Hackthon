const pool = require("../config/db");

// Crear un nuevo usuario
const createUser = async (nombre, apellido, email, contrasena, telefono_usuario, rol) => {
  const query = `
    INSERT INTO Usuarios (nombre, apellido, email, contrasena, telefono_usuario, rol)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [nombre, apellido, email, contrasena, telefono_usuario, rol];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Buscar usuario por email
const findByEmail = async (email) => {
  const query = "SELECT * FROM Usuarios WHERE email = $1";
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

module.exports = { createUser, findByEmail };
