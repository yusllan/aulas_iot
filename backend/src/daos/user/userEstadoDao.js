import { pool } from "../../config/posgres/dataBase.js";

export default class EstadoUsuarioDao {
  // Crear un estado nuevo
  static async crearEstado(nombre_estado) {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO estado_usuario (nombre_estado)
        VALUES ($1)
        RETURNING *;
      `;
      const result = await client.query(query, [nombre_estado]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  // Obtener todos los estados
  static async obtenerEstados() {
    const query = "SELECT * FROM estado_usuario ORDER BY id_estado;";
    const result = await pool.query(query);
    return result.rows;
  }

  // Obtener estado por ID
  static async obtenerEstadoPorId(id_estado) {
    const query = "SELECT * FROM estado_usuario WHERE id_estado = $1;";
    const result = await pool.query(query, [id_estado]);
    return result.rows[0];
  }

  // Obtener estado por nombre
  static async obtenerEstadoPorNombre(nombre_estado) {
    const query =
      "SELECT id_estado, nombre_estado FROM estado_usuario WHERE nombre_estado = $1;";
    const result = await pool.query(query, [nombre_estado]);
    return result.rows[0];
  }

  // Actualizar estado
  static async actualizarEstado(id_estado, nombre_estado) {
    const query = `
      UPDATE estados_usuario
      SET nombre_estado = $1
      WHERE id_estado = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [nombre_estado, id_estado]);
    return result.rows[0];
  }

  // Eliminar estado
  static async eliminarEstado(id_estado) {
    const query =
      "DELETE FROM estado_usuario WHERE id_estado = $1 RETURNING *;";
    const result = await pool.query(query, [id_estado]);
    return result.rows[0];
  }
}
