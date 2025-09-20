const pool = require("../config/db");

// Crear usuario
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

// Buscar usuario por id
const findById = async (id) => {
  const query = "SELECT id_usuario, nombre, apellido, email, telefono_usuario, rol FROM Usuarios WHERE id_usuario = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Actualizar usuario
const updateUser = async (id, nombre, apellido, email, telefono_usuario) => {
  const query = `
    UPDATE Usuarios
    SET nombre = $1, apellido = $2, email = $3, telefono_usuario = $4
    WHERE id_usuario = $5
    RETURNING id_usuario, nombre, apellido, email, telefono_usuario, rol;
  `;
  const values = [nombre, apellido, email, telefono_usuario, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { createUser, findByEmail, findById, updateUser };
