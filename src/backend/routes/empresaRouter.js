const express = require("express");
const router = express.Router();
const {
  crearEmpresa,
  obtenerTodasLasEmpresas,
  obtenerEmpresaPorId,
  actualizarEmpresa,
  eliminarEmpresa,
  buscarEmpresasPublicas,
} = require("../controllers/empresaController");

// Rutas públicas
router.get("/publicas", buscarEmpresasPublicas); // GET /api/empresas/publicas

// Rutas CRUD
router.route("/")
  .get(obtenerTodasLasEmpresas)   // GET /api/empresas
  .post(crearEmpresa);            // POST /api/empresas

router.route("/:id")
  .get(obtenerEmpresaPorId)       // GET /api/empresas/:id
  .put(actualizarEmpresa)         // PUT /api/empresas/:id
  .delete(eliminarEmpresa);       // DELETE /api/empresas/:id

module.exports = router;
