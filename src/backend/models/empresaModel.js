import pool from "../config/db.js";

class Empresa {
  static async crear(data) {
    const query = `
      INSERT INTO Empresas 
      (tipoempresa, nombre_empresa, nit, razon_social, direccion, telefonoempresa, email_contacto, sector, estado_formalizacion, logo_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `;
    const values = [
      data.tipoEmpresa,
      data.nombre_empresa,
      data.nit,
      data.razon_social,
      data.direccion,
      data.telefonoEmpresa,
      data.email_contacto,
      data.sector,
      data.estado_formalizacion,
      data.logo_url
    ];

    const result = await pool.query(query, values);
    const empresa = result.rows[0];

    // 👇 Verificamos si el usuario ya existe en Emprendedores
    if (data.id_usuario) {
      const check = await pool.query(
        "SELECT * FROM Emprendedores WHERE id_usuario = $1",
        [data.id_usuario]
      );

      if (check.rows.length === 0) {
        // Si no existe, lo creamos y mostramos en consola
        const nuevo = await pool.query(
          `INSERT INTO Emprendedores (id_usuario, id_empresa) VALUES ($1, $2) RETURNING *`,
          [data.id_usuario, empresa.id_empresa]
        );
        const emprendedor = nuevo.rows[0];
        console.log("✅ Emprendedor guardado");
        console.log(
          `id_emprendedor: ${emprendedor.id_emprendedor}, id_usuario: ${emprendedor.id_usuario}, id_empresa: ${emprendedor.id_empresa}`
        );
      } else {
        // Si ya existe, actualizamos la empresa y mostramos en consola
        const actualizado = await pool.query(
          `UPDATE Emprendedores SET id_empresa = $1 WHERE id_usuario = $2 RETURNING *`,
          [empresa.id_empresa, data.id_usuario]
        );
        const emprendedor = actualizado.rows[0];
        console.log("🔄 Emprendedor actualizado");
        console.log(
          `id_emprendedor: ${emprendedor.id_emprendedor}, id_usuario: ${emprendedor.id_usuario}, id_empresa: ${emprendedor.id_empresa}`
        );
      }
    }

    return empresa;
  }

  static async obtenerTodas() {
    const result = await pool.query("SELECT * FROM Empresas ORDER BY id_empresa DESC");
    return result.rows;
  }
}

export default Empresa;
