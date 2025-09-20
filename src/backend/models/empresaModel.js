const pool = require('../config/db');

class Empresa {
  // Crear nueva empresa y asociarla al usuario a través de Emprendedores
  static async crear(datosEmpresa, id_usuario, descripcion = null) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

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
        logo_url
      } = datosEmpresa;

      // 1. Crear la empresa
      const empresaQuery = `
        INSERT INTO Empresas (
          tipoEmpresa, 
          nombre_empresa, 
          nit, 
          razon_social, 
          direccion, 
          telefonoEmpresa, 
          email_contacto, 
          sector, 
          estado_formalizacion, 
          logo_url
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *
      `;

      const empresaValues = [
        tipoEmpresa,
        nombre_empresa,
        nit,
        razon_social,
        direccion,
        telefonoEmpresa,
        email_contacto,
        sector,
        estado_formalizacion || 'Por Formalizar',
        logo_url
      ];

      const empresaResult = await client.query(empresaQuery, empresaValues);
      const nuevaEmpresa = empresaResult.rows[0];

      // 2. Crear o actualizar la relación en Emprendedores
      // Primero verificar si ya existe un emprendedor para este usuario
      const emprendedorExistente = await client.query(
        'SELECT id_emprendedor FROM Emprendedores WHERE id_usuario = $1',
        [id_usuario]
      );

      if (emprendedorExistente.rows.length > 0) {
        // Actualizar el emprendedor existente
        await client.query(
          'UPDATE Emprendedores SET id_empresa = $1, descripcion = $2 WHERE id_usuario = $3',
          [nuevaEmpresa.id_empresa, descripcion, id_usuario]
        );
      } else {
        // Crear nuevo emprendedor
        await client.query(
          'INSERT INTO Emprendedores (id_usuario, id_empresa, descripcion) VALUES ($1, $2, $3)',
          [id_usuario, nuevaEmpresa.id_empresa, descripcion]
        );
      }

      await client.query('COMMIT');
      return nuevaEmpresa;

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Obtener todas las empresas (para admin)
  static async obtenerTodas() {
    const query = `
      SELECT e.*, u.nombre, u.apellido, u.email as email_usuario, emp.descripcion as descripcion_emprendedor
      FROM Empresas e
      LEFT JOIN Emprendedores emp ON e.id_empresa = emp.id_empresa
      LEFT JOIN Usuarios u ON emp.id_usuario = u.id_usuario
      ORDER BY e.fecha_creada DESC
    `;

    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Obtener empresas de un usuario específico
  static async obtenerPorUsuario(id_usuario) {
    const query = `
      SELECT e.*, emp.descripcion as descripcion_emprendedor
      FROM Empresas e
      INNER JOIN Emprendedores emp ON e.id_empresa = emp.id_empresa
      WHERE emp.id_usuario = $1
      ORDER BY e.fecha_creada DESC
    `;

    try {
      const result = await pool.query(query, [id_usuario]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Obtener empresa por ID
  static async obtenerPorId(id) {
    const query = `
      SELECT e.*, u.nombre, u.apellido, u.email as email_usuario, emp.descripcion as descripcion_emprendedor
      FROM Empresas e
      LEFT JOIN Emprendedores emp ON e.id_empresa = emp.id_empresa
      LEFT JOIN Usuarios u ON emp.id_usuario = u.id_usuario
      WHERE e.id_empresa = $1
    `;

    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Verificar si una empresa pertenece a un usuario
  static async verificarPropietario(id_empresa, id_usuario) {
    const query = `
      SELECT e.id_empresa 
      FROM Empresas e
      INNER JOIN Emprendedores emp ON e.id_empresa = emp.id_empresa
      WHERE e.id_empresa = $1 AND emp.id_usuario = $2
    `;

    try {
      const result = await pool.query(query, [id_empresa, id_usuario]);
      return result.rows.length > 0;
    } catch (error) {
      throw error;
    }
  }

  // Obtener empresa por NIT
  static async obtenerPorNit(nit) {
    const query = `
      SELECT * FROM Empresas 
      WHERE nit = $1
    `;

    try {
      const result = await pool.query(query, [nit]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Actualizar empresa
  static async actualizar(id, datosActualizados, id_usuario) {
    // Primero verificar que el usuario sea el propietario
    const esPropietario = await this.verificarPropietario(id, id_usuario);
    if (!esPropietario) {
      throw new Error('No tienes permisos para actualizar esta empresa');
    }

    const campos = [];
    const valores = [];
    let contador = 1;

    // Construir dinámicamente la query UPDATE
    for (const [campo, valor] of Object.entries(datosActualizados)) {
      if (valor !== undefined && valor !== null && campo !== 'descripcion') {
        campos.push(`${campo} = $${contador}`);
        valores.push(valor);
        contador++;
      }
    }

    if (campos.length === 0 && !datosActualizados.descripcion) {
      throw new Error('No hay campos para actualizar');
    }

    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      let empresaActualizada = null;

      // Actualizar empresa si hay campos
      if (campos.length > 0) {
        const empresaQuery = `
          UPDATE Empresas 
          SET ${campos.join(', ')} 
          WHERE id_empresa = $${contador} 
          RETURNING *
        `;

        valores.push(id);
        const result = await client.query(empresaQuery, valores);
        empresaActualizada = result.rows[0];
      }

      // Actualizar descripción en Emprendedores si se proporciona
      if (datosActualizados.descripcion !== undefined) {
        await client.query(
          'UPDATE Emprendedores SET descripcion = $1 WHERE id_empresa = $2 AND id_usuario = $3',
          [datosActualizados.descripcion, id, id_usuario]
        );
      }

      await client.query('COMMIT');
      
      // Obtener la empresa completa actualizada
      return await this.obtenerPorId(id);

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Eliminar empresa
  static async eliminar(id, id_usuario) {
    // Verificar que el usuario sea el propietario
    const esPropietario = await this.verificarPropietario(id, id_usuario);
    if (!esPropietario) {
      throw new Error('No tienes permisos para eliminar esta empresa');
    }

    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Eliminar primero la relación en Emprendedores
      await client.query(
        'DELETE FROM Emprendedores WHERE id_empresa = $1 AND id_usuario = $2',
        [id, id_usuario]
      );

      // Luego eliminar la empresa
      const result = await client.query(
        'DELETE FROM Empresas WHERE id_empresa = $1 RETURNING *',
        [id]
      );

      await client.query('COMMIT');
      return result.rows[0];

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Buscar empresas por filtros
  static async buscar(filtros) {
    let query = `
      SELECT e.*, u.nombre, u.apellido, u.email as email_usuario, emp.descripcion as descripcion_emprendedor
      FROM Empresas e
      LEFT JOIN Emprendedores emp ON e.id_empresa = emp.id_empresa
      LEFT JOIN Usuarios u ON emp.id_usuario = u.id_usuario
      WHERE 1=1
    `;
    const valores = [];
    let contador = 1;

    if (filtros.sector) {
      query += ` AND e.sector ILIKE $${contador}`;
      valores.push(`%${filtros.sector}%`);
      contador++;
    }

    if (filtros.tipoEmpresa) {
      query += ` AND e.tipoEmpresa = $${contador}`;
      valores.push(filtros.tipoEmpresa);
      contador++;
    }

    if (filtros.estado_formalizacion) {
      query += ` AND e.estado_formalizacion = $${contador}`;
      valores.push(filtros.estado_formalizacion);
      contador++;
    }

    if (filtros.id_usuario) {
      query += ` AND emp.id_usuario = $${contador}`;
      valores.push(filtros.id_usuario);
      contador++;
    }

    query += ' ORDER BY e.fecha_creada DESC';

    try {
      const result = await pool.query(query, valores);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Empresa;