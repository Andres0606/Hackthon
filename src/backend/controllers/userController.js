const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

// Registro de usuario
const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, contrasena, telefono_usuario } = req.body;

    // Validar campos obligatorios
    if (!nombre || !apellido || !email || !contrasena) {
      return res.status(400).json({ message: "Todos los campos obligatorios deben llenarse" });
    }

    // Verificar si ya existe el email
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear usuario con rol "ciudadano" por defecto
    const newUser = await userModel.createUser(
      nombre,
      apellido,
      email,
      hashedPassword,
      telefono_usuario,
      "ciudadano"
    );

    res.status(201).json({
      message: "✅ Usuario registrado con éxito",
      user: {
        id_usuario: newUser.id_usuario,
        nombre: newUser.nombre,
        email: newUser.email,
        rol: newUser.rol
      }
    });

  } catch (error) {
    console.error("❌ Error en el registro:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { registerUser };
