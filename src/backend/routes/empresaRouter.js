import express from "express";
import { crearEmpresa, obtenerEmpresas } from "../controllers/empresaController.js";

const router = express.Router();

router.post("/", crearEmpresa);
router.get("/", obtenerEmpresas);

export default router;
