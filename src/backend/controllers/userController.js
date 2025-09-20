const bcrypt = require("bcrypt");
const { createUser, findByEmail, findById, updateUser } = require("../models/userModel");

// Registro de usuario
const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, contrasena, telefono_usuario } = req.body;

    if (!nombre || !apellido || !email || !contrasena) {
      return res.status(400).json({ message: "Todos los campos obligatorios deben llenarse" });
    }

    const existingUser = await findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const newUser = await createUser(
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

// Login de usuario
const loginUser = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

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

// Obtener usuario por id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Error al obtener usuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Actualizar usuario
const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono_usuario } = req.body;

    const updatedUser = await updateUser(id, nombre, apellido, email, telefono_usuario);

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "✅ Usuario actualizado con éxito",
      user: updatedUser
    });
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { registerUser, loginUser, getUserById, updateUserController };
