import { pool } from "../../config/posgres/dataBase.js";

export default class UsuarioPermisoDao {
  // Asignar permisos a un usuario
  static async asignarPermisosAUsuario(id_usuario, permisos) {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO usuario_permisos (id_usuario, id_permiso)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING;
      `;
      const values = [id_usuario, permisos];
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error al asignar permisos a usuario:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Remover permisos de un usuario
  static async removerPermisosDeUsuario(id_usuario, permisos) {
    const client = await pool.connect();
    try {
      const query = `
        DELETE FROM usuario_permisos
        WHERE id_usuario = $1 AND id_permiso = $2;
      `;
      const values = [id_usuario, permisos];
      await client.query(query, values);
    } catch (error) {
      console.error("Error al eliminar permisos de usuario:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Obtener permisos de un usuario
  static async obtenerPermisosDeUsuario(id_usuario) {
    const query = `
    SELECT p.id_permiso, p.nombre_permiso
    FROM usuario_permisos up
    JOIN permisos p ON up.id_permiso = p.id_permiso
    WHERE up.id_usuario = $1
  `;
    const result = await pool.query(query, [id_usuario]);
    return result.rows;
  }
}
