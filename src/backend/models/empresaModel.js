const pool = require("../config/db");

class Empresa {
  // Crear nueva empresa
  static async crear(datosEmpresa, id_usuario = null, descripcion = null) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

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
      } = datosEmpresa;

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
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
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
        estado_formalizacion || "Por Formalizar",
        logo_url,
      ];

      const empresaResult = await client.query(empresaQuery, empresaValues);
      const nuevaEmpresa = empresaResult.rows[0];

      // Relación en Emprendedores (opcional)
      if (id_usuario) {
        await client.query(
          "INSERT INTO Emprendedores (id_usuario, id_empresa, descripcion) VALUES ($1,$2,$3)",
          [id_usuario, nuevaEmpresa.id_empresa, descripcion]
        );
      }

      await client.query("COMMIT");
      return nuevaEmpresa;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // Obtener todas
  static async obtenerTodas() {
    const query = `SELECT * FROM Empresas ORDER BY fecha_creada DESC`;
    const result = await pool.query(query);
    return result.rows;
  }

  // Obtener por ID
  static async obtenerPorId(id) {
    const query = `SELECT * FROM Empresas WHERE id_empresa = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Actualizar
  static async actualizar(id, datosActualizados) {
    const campos = [];
    const valores = [];
    let contador = 1;

    for (const [campo, valor] of Object.entries(datosActualizados)) {
      if (valor !== undefined && valor !== null) {
        campos.push(`${campo} = $${contador}`);
        valores.push(valor);
        contador++;
      }
    }

    if (campos.length === 0) return null;

    const query = `
      UPDATE Empresas
      SET ${campos.join(", ")}
      WHERE id_empresa = $${contador}
      RETURNING *
    `;
    valores.push(id);

    const result = await pool.query(query, valores);
    return result.rows[0];
  }

  // Eliminar
  static async eliminar(id) {
    const query = `DELETE FROM Empresas WHERE id_empresa = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Buscar
  static async buscar(filtros) {
    let query = `SELECT * FROM Empresas WHERE 1=1`;
    const valores = [];
    let contador = 1;

    if (filtros.sector) {
      query += ` AND sector ILIKE $${contador}`;
      valores.push(`%${filtros.sector}%`);
      contador++;
    }
    if (filtros.tipoEmpresa) {
      query += ` AND tipoEmpresa = $${contador}`;
      valores.push(filtros.tipoEmpresa);
      contador++;
    }
    if (filtros.estado_formalizacion) {
      query += ` AND estado_formalizacion = $${contador}`;
      valores.push(filtros.estado_formalizacion);
      contador++;
    }

    query += ` ORDER BY fecha_creada DESC`;
    const result = await pool.query(query, valores);
    return result.rows;
  }
}

module.exports = Empresa;
