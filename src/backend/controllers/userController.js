const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

// Registro de usuario
const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, contrasena, telefono_usuario, rol } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear usuario
    const newUser = await userModel.createUser(
      nombre,
      apellido,
      email,
      hashedPassword,
      telefono_usuario,
      rol || "ciudadano"
    );

    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { registerUser };
