const Empresa = require("../models/empresaModel");

// Crear nueva empresa (sin token, id_usuario = null por ahora)
const crearEmpresa = async (req, res) => {
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
      logo_url,
      descripcion,
    } = req.body;

    // Sin autenticación → id_usuario en null
    const id_usuario = null;

    if (!tipoEmpresa || !nombre_empresa) {
      return res.status(400).json({
        success: false,
        message: "Tipo de empresa y nombre son obligatorios",
      });
    }

    const nuevaEmpresa = await Empresa.crear(
      {
        tipoEmpresa,
        nombre_empresa,
        nit,
        razon_social: razon_social || nombre_empresa,
        direccion,
        telefonoEmpresa,
        email_contacto,
        sector,
        estado_formalizacion,
        logo_url,
      },
      id_usuario,
      descripcion
    );

    res.status(201).json({
      success: true,
      message: "Empresa creada exitosamente",
      data: nuevaEmpresa,
    });
  } catch (error) {
    console.error("Error al crear empresa:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

// Obtener todas las empresas
const obtenerTodasLasEmpresas = async (req, res) => {
  try {
    const { sector, tipoEmpresa, estado_formalizacion } = req.query;
    let empresas;

    if (sector || tipoEmpresa || estado_formalizacion) {
      empresas = await Empresa.buscar({
        sector,
        tipoEmpresa,
        estado_formalizacion,
      });
    } else {
      empresas = await Empresa.obtenerTodas();
    }

    res.status(200).json({
      success: true,
      count: empresas.length,
      data: empresas,
    });
  } catch (error) {
    console.error("Error al obtener empresas:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

// Obtener empresa por ID
const obtenerEmpresaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.obtenerPorId(id);

    if (!empresa) {
      return res.status(404).json({
        success: false,
        message: "Empresa no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      data: empresa,
    });
  } catch (error) {
    console.error("Error al obtener empresa:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

// Actualizar empresa
const actualizarEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const empresaExistente = await Empresa.obtenerPorId(id);
    if (!empresaExistente) {
      return res.status(404).json({
        success: false,
        message: "Empresa no encontrada",
      });
    }

    const empresaActualizada = await Empresa.actualizar(id, datosActualizados);

    res.status(200).json({
      success: true,
      message: "Empresa actualizada exitosamente",
      data: empresaActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar empresa:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

// Eliminar empresa
const eliminarEmpresa = async (req, res) => {
  try {
    const { id } = req.params;

    const empresaEliminada = await Empresa.eliminar(id);

    if (!empresaEliminada) {
      return res.status(404).json({
        success: false,
        message: "Empresa no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      message: "Empresa eliminada exitosamente",
      data: empresaEliminada,
    });
  } catch (error) {
    console.error("Error al eliminar empresa:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

// Buscar empresas públicas
const buscarEmpresasPublicas = async (req, res) => {
  try {
    const { sector, tipoEmpresa, estado_formalizacion, q } = req.query;

    let empresas = await Empresa.buscar({
      sector,
      tipoEmpresa,
      estado_formalizacion,
    });

    if (q) {
      const termino = q.toLowerCase();
      empresas = empresas.filter(
        (empresa) =>
          empresa.nombre_empresa.toLowerCase().includes(termino) ||
          (empresa.sector &&
            empresa.sector.toLowerCase().includes(termino)) ||
          (empresa.descripcion_emprendedor &&
            empresa.descripcion_emprendedor.toLowerCase().includes(termino))
      );
    }

    res.status(200).json({
      success: true,
      count: empresas.length,
      data: empresas,
    });
  } catch (error) {
    console.error("Error al buscar empresas:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

module.exports = {
  crearEmpresa,
  obtenerTodasLasEmpresas,
  obtenerEmpresaPorId,
  actualizarEmpresa,
  eliminarEmpresa,
  buscarEmpresasPublicas,
};
