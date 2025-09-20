const Empresa = require('../models/empresaModel');

// Crear nueva empresa
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
      descripcion // Descripción del emprendedor
    } = req.body;

    // El id_usuario viene del middleware de autenticación
    const id_usuario = req.usuario.id;

    // Validaciones básicas
    if (!tipoEmpresa || !nombre_empresa) {
      return res.status(400).json({
        success: false,
        message: 'Tipo de empresa y nombre son obligatorios'
      });
    }

    // Verificar si ya existe una empresa con el mismo NIT (si se proporciona)
    if (nit) {
      const empresaExistente = await Empresa.obtenerPorNit(nit);
      if (empresaExistente) {
        return res.status(400).json({
          success: false,
          message: 'Ya existe una empresa registrada con este NIT'
        });
      }
    }

    // Crear nueva empresa
    const nuevaEmpresa = await Empresa.crear({
      tipoEmpresa,
      nombre_empresa,
      nit,
      razon_social: razon_social || nombre_empresa,
      direccion,
      telefonoEmpresa,
      email_contacto,
      sector,
      estado_formalizacion,
      logo_url
    }, id_usuario, descripcion);

    res.status(201).json({
      success: true,
      message: 'Empresa creada exitosamente',
      data: nuevaEmpresa
    });

  } catch (error) {
    console.error('Error al crear empresa:', error);
    
    // Manejar errores específicos de PostgreSQL
    if (error.code === '23505') { // Violación de restricción única
      return res.status(400).json({
        success: false,
        message: 'Ya existe una empresa con este NIT'
      });
    }

    if (error.code === '23502') { // Violación NOT NULL
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios'
      });
    }

    if (error.code === '23503') { // Violación de clave foránea
      return res.status(400).json({
        success: false,
        message: 'Usuario no válido'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Obtener empresas del usuario logueado
const obtenerMisEmpresas = async (req, res) => {
  try {
    const id_usuario = req.usuario.id;
    const empresas = await Empresa.obtenerPorUsuario(id_usuario);

    res.status(200).json({
      success: true,
      count: empresas.length,
      data: empresas
    });

  } catch (error) {
    console.error('Error al obtener mis empresas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener todas las empresas (solo para admin)
const obtenerTodasLasEmpresas = async (req, res) => {
  try {
    // Verificar si el usuario es admin (puedes agregar esta validación)
    // if (req.usuario.rol !== 'administrador') {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'No tienes permisos para ver todas las empresas'
    //   });
    // }

    const { sector, tipoEmpresa, estado_formalizacion } = req.query;
    let empresas;
    
    // Si hay filtros, usar búsqueda filtrada
    if (sector || tipoEmpresa || estado_formalizacion) {
      empresas = await Empresa.buscar({
        sector,
        tipoEmpresa,
        estado_formalizacion
      });
    } else {
      // Obtener todas las empresas
      empresas = await Empresa.obtenerTodas();
    }

    res.status(200).json({
      success: true,
      count: empresas.length,
      data: empresas
    });

  } catch (error) {
    console.error('Error al obtener empresas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener empresa por ID
const obtenerEmpresaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.usuario.id;

    const empresa = await Empresa.obtenerPorId(id);

    if (!empresa) {
      return res.status(404).json({
        success: false,
        message: 'Empresa no encontrada'
      });
    }

    // Verificar si el usuario puede ver esta empresa
    // (es el propietario o es admin)
    const esPropietario = await Empresa.verificarPropietario(id, id_usuario);
    if (!esPropietario) {
      // Aquí podrías agregar lógica para admins
      // if (req.usuario.rol !== 'administrador') {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para ver esta empresa'
        });
      // }
    }

    res.status(200).json({
      success: true,
      data: empresa
    });

  } catch (error) {
    console.error('Error al obtener empresa:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar empresa
const actualizarEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.usuario.id;
    const datosActualizados = req.body;

    // Verificar si la empresa existe
    const empresaExistente = await Empresa.obtenerPorId(id);
    if (!empresaExistente) {
      return res.status(404).json({
        success: false,
        message: 'Empresa no encontrada'
      });
    }

    // Actualizar empresa (incluye verificación de propietario)
    const empresaActualizada = await Empresa.actualizar(id, datosActualizados, id_usuario);

    res.status(200).json({
      success: true,
      message: 'Empresa actualizada exitosamente',
      data: empresaActualizada
    });

  } catch (error) {
    console.error('Error al actualizar empresa:', error);
    
    if (error.message === 'No tienes permisos para actualizar esta empresa') {
      return res.status(403).json({
        success: false,
        message: error.message
      });
    }

    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una empresa con este NIT'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Eliminar empresa
const eliminarEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.usuario.id;

    // Eliminar empresa (incluye verificación de propietario)
    const empresaEliminada = await Empresa.eliminar(id, id_usuario);

    if (!empresaEliminada) {
      return res.status(404).json({
        success: false,
        message: 'Empresa no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Empresa eliminada exitosamente',
      data: empresaEliminada
    });

  } catch (error) {
    console.error('Error al eliminar empresa:', error);
    
    if (error.message === 'No tienes permisos para eliminar esta empresa') {
      return res.status(403).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Buscar empresas públicas (sin autenticación requerida)
const buscarEmpresasPublicas = async (req, res) => {
  try {
    const { sector, tipoEmpresa, estado_formalizacion, q } = req.query;
    
    const empresas = await Empresa.buscar({
      sector,
      tipoEmpresa,
      estado_formalizacion
    });

    // Filtrar por término de búsqueda si se proporciona
    let empresasFiltradas = empresas;
    if (q) {
      const termino = q.toLowerCase();
      empresasFiltradas = empresas.filter(empresa => 
        empresa.nombre_empresa.toLowerCase().includes(termino) ||
        empresa.sector.toLowerCase().includes(termino) ||
        (empresa.descripcion_emprendedor && empresa.descripcion_emprendedor.toLowerCase().includes(termino))
      );
    }

    res.status(200).json({
      success: true,
      count: empresasFiltradas.length,
      data: empresasFiltradas
    });

  } catch (error) {
    console.error('Error al buscar empresas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  crearEmpresa,
  obtenerMisEmpresas,
  obtenerTodasLasEmpresas,
  obtenerEmpresaPorId,
  actualizarEmpresa,
  eliminarEmpresa,
  buscarEmpresasPublicas
};