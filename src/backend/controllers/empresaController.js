import Empresa from "../models/empresaModel.js";

export const crearEmpresa = async (req, res) => {
  try {
    const {
      tipoEmpresa,
      nombre_empresa,
      nit,
      razon_social,
      direccion,
      telefonoEmpresa,
      email_contacto,
      sector,
      estado_formalizacion,
      id_usuario
    } = req.body;

    const logo_url = req.file ? `/uploads/${req.file.filename}` : null;

    const nuevaEmpresa = await Empresa.crear({
      tipoEmpresa,
      nombre_empresa,
      nit,
      razon_social,
      direccion,
      telefonoEmpresa,
      email_contacto,
      sector,
      estado_formalizacion,
      logo_url,
      id_usuario
    });

    res.status(201).json(nuevaEmpresa);
  } catch (error) {
    console.error("Error al crear empresa:", error);
    res.status(500).json({ error: "Error al crear empresa" });
  }
};

export const obtenerEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.obtenerTodas();
    res.json(empresas);
  } catch (error) {
    console.error("Error al obtener empresas:", error);
    res.status(500).json({ error: "Error al obtener empresas" });
  }
};
