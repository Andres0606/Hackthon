const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserById, updateUserController } = require("../controllers/userController");


router.post("/register", registerUser);


router.post("/login", loginUser);

// Obtener usuario por id
router.get("/:id", getUserById);

// Actualizar usuario
router.put("/:id", updateUserController);

module.exports = router;
