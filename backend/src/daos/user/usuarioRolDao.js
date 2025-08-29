import { pool } from "../../config/posgres/dataBase.js";

export default class UsuarioRolDao {
  // Asignar roles a un usuario
  static async asignarRolesAUsuario(id_usuario, roles, client = null) {
    const c = await pool.connect();
    try {
      const query = `
                INSERT INTO usuario_roles (id_usuario, id_role)
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING;
            `;
      const values = [id_usuario, roles];
      const result = await c.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error al asignar roles a usuario:", error);
      throw error;
    } finally {
      if (!client) c.release();
    }
  }

  //Obtener rol por nombre
  static async obtenerRolPorNombre(nombre_role) {
    const client = await pool.connect();
    try {
      const query = `SELECT id_role, nombre_role FROM roles WHERE nombre_role = $1;`;
      const result = await client.query(query, [nombre_role]);
      return result.rows[0]; // retorna { id_role, nombre_role }
    } catch (error) {
      console.error("Error al obtener rol por nombre:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  static async removerRolesDeUsuario(id_usuario, roles) {
    const client = await pool.connect();
    try {
      const query = `
                DELETE FROM usuario_roles
                WHERE id_usuario = $1 AND id_rol = $2;
            `;
      const values = [id_usuario, roles];
      await client.query(query, values);
    } catch (error) {
      console.error("Error al eliminar roles de usuario:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Obtener roles de un usuario
  static async obtenerRolesDeUsuario(id_usuario) {
    const query = `
    SELECT r.id_role, r.nombre_role
    FROM usuario_roles ur
    JOIN roles r ON ur.id_role = r.id_role
    WHERE ur.id_usuario = $1
  `;
    const result = await pool.query(query, [id_usuario]);
    return result.rows;
  }
}
