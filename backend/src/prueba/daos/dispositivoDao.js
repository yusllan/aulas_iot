import { pool } from "../../config/posgres/dataBase.js";
import Dispositivo from "../model/dispositivoModel.js";

export default class DispositivoDao {
  static async getOrCreate(dispositivoDate) {
    const { nombre, ubicacion } = dispositivoDate;
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const query = `
        INSERT INTO dispositivos (nombre, ubicacion)
        VALUES ($1, $2)
        ON CONFLICT (nombre) DO UPDATE SET ubicacion = EXCLUDED.ubicacion
        RETURNING id_dispositivo;
      `;

      const values = [nombre, ubicacion];
      const { rows } = await client.query(query, values);
      await client.query("COMMIT");
      return rows[0].id_dispositivo;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(
        "Error en la creación/actualización del dispositivo:",
        error
      );

      throw error;
    } finally {
      client.release(); //liberamos la conexión
    }
  }
}
