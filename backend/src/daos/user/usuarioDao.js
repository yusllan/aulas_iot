import { pool } from "../../config/posgres/dataBase.js";

export default class UsuarioDao {
  // Crear usuario
  static async crearUsuario(userData, client = null) {
    const { nombre, apellido, email, dni, celular, id_estado } = userData;
    const c = client || (await pool.connect());

    try {
      const query = `
        INSERT INTO usuarios (nombre, apellido, email, dni, celular, id_estado)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      const values = [nombre, apellido, email, dni, celular, id_estado];
      const result = await c.query(query, values);
      return result.rows[0];
    } finally {
      if (!client) c.release();
    }
  }

  //Obtener todos los usuarios
  static async obtenerUsuarios() {
    const client = await pool.connect();
    const query = "SELECT * FROM usuarios;";
    const result = await client.query(query);
    return result;
  }

  // Obtener usuarios por dni
  static async obtenerUsuarioPorDni(dni) {
    const query = "SELECT * FROM usuarios WHERE dni = $1;";
    const result = await pool.query(query, [dni]);
    return result.rows[0];
  }

  //Obtener usuario por ID
  static async obtenerUsuarioPorId(id_usuario) {
    const query = "SELECT * FROM usuarios WHERE id_usuario = $1;";
    const result = await pool.query(query, [id_usuario]);
    return result.rows[0];
  }

  //Buscar usuario por DNI, nombre o apellido
  static async buscarUsuarios(filtro) {
    const query = `
      SELECT * FROM usuarios
      WHERE dni ILIKE $1 OR nombre ILIKE $1 OR apellido ILIKE $1
    `;
    const result = await pool.query(query, [`%${filtro}%`]);
    return result.rows;
  }

  // Actualizar usuario (datos personales)
  static async actualizarUsuario(id_usuario, userData) {
    const { nombre, apellido, email, dni, celular } = userData;

    const client = await pool.connect();

    const query = `
      UPDATE usuarios
      SET nombre = $1, apellido = $2, email = $3, dni = $4, celular = $5,
        fecha_actualizacion = NOW()
      WHERE id_usuario = $6
      RETURNING *;
    `;
    const values = [nombre, apellido, email, dni, celular, id_usuario];
    const result = await client.query(query, values);
    return result.rows[0];
  }

  //Eliminar usuario
  static async eliminarUsuario(id_usuario) {
    const client = await pool.connect();
    const query = "DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *;";
    const result = await client.query(query, [id_usuario]);
    return result.rows[0];
  }

  //Obtener usuario por email
  static async obtenerUsuarioPorEmail(email) {
    const query = "SELECT * FROM usuarios WHERE email = $1;";
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }
}
