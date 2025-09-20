const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/auth');
const {
  crearEmpresa,
  obtenerMisEmpresas,
  obtenerTodasLasEmpresas,
  obtenerEmpresaPorId,
  actualizarEmpresa,
  eliminarEmpresa,
  buscarEmpresasPublicas
} = require('../controllers/empresaController');

// Rutas públicas (sin autenticación)
router.get('/publicas', buscarEmpresasPublicas);  // GET /api/empresas/publicas

// Rutas protegidas (requieren autenticación)
router.use(verificarToken); // Aplicar middleware de autenticación a todas las rutas siguientes

// Rutas para empresas del usuario logueado
router.route('/mis-empresas')
  .get(obtenerMisEmpresas);      // GET /api/empresas/mis-empresas

router.route('/')
  .get(obtenerTodasLasEmpresas)   // GET /api/empresas (todas las empresas - para admin)
  .post(crearEmpresa);           // POST /api/empresas

router.route('/:id')
  .get(obtenerEmpresaPorId)       // GET /api/empresas/:id
  .put(actualizarEmpresa)         // PUT /api/empresas/:id
  .delete(eliminarEmpresa);       // DELETE /api/empresas/:id

module.exports = router;