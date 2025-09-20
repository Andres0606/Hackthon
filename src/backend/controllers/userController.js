const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

// Registro de usuario (ya lo tienes)
const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, contrasena, telefono_usuario } = req.body;

    if (!nombre || !apellido || !email || !contrasena) {
      return res.status(400).json({ message: "Todos los campos obligatorios deben llenarse" });
    }

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

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

// 🔹 Login de usuario
const loginUser = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    // Verificar campos
    if (!email || !contrasena) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    // Buscar usuario
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Si es correcto
    res.status(200).json({
      message: "✅ Login exitoso",
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });

  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { registerUser, loginUser };
