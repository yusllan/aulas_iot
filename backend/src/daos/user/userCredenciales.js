import { pool } from "../../config/posgres/dataBase.js";

export default class CredencialesDao {
  // Insertar credenciales para un usuario
  static async crearCredenciales(id_usuario, password_hash, client = null) {
    const c = client || (await pool.connect());

    try {
      const query = `
        INSERT INTO credenciales (id_usuario, password_hash)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const result = await c.query(query, [id_usuario, password_hash]);
      return result.rows[0];
    } catch (error) {
      console.error("Error al crear credenciales:", error);
      throw error;
    } finally {
      client.release();
      if (!client) c.release();
    }
  }

  // Actualizar contraseña de un usuario
  static async actualizarPassword(id_usuario, password_hash) {
    const client = await pool.connect();
    try {
      const query = `
        UPDATE credenciales
        SET password_hash = $1
        WHERE id_usuario = $2
        RETURNING *;
      `;
      const result = await client.query(query, [password_hash, id_usuario]);
      return result.rows[0];
    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Obtener credenciales por usuario (para login)
  static async obtenerCredencialesPorUsuario(id_usuario) {
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM credenciales
        WHERE id_usuario = $1;
      `;
      const result = await client.query(query, [id_usuario]);
      return result.rows[0];
    } catch (error) {
      console.error("Error al obtener credenciales:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}
