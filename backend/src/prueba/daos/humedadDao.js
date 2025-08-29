import { pool } from "../../config/posgres/dataBase.js";
import Humedad from "../model/humedadModel.js";

export default class HumedadDao {
  static async create(humedadData) {
    const { dispositivo, valor } = humedadData;
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const query = `INSERT INTO humedad (dispositivo, valor) VALUES ($1, $2)
            RETURNING *`;
      const values = [dispositivo, valor];

      const { rows } = await client.query(query, values);
      await client.query("COMMIT");
      return new Humedad(rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error en la creación humedad: ", error);
      throw error;
    } finally {
      client.release();
    }
  }

  //Función para mostrar datos de humedad
  static async showHumedad() {
    const client = await pool.connect();
    try {
      const query = `
      SELECT * 
      FROM humedad 
      ORDER BY fecha DESC 
      LIMIT 20
    `;
      const { rows } = await client.query(query);
      return rows.map((row) => new Humedad(row));
    } catch (error) {
      console.error("Error al obtener datos de humedad: ", error);
      throw error;
    } finally {
      client.release();
    }
  }

  //Función para mostrar datos de humedad por fecha
  static async showTimeHumedad(fechaInicio, fechaFin) {
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM humedad 
        WHERE fecha BETWEEN $1 AND $2 
        ORDER BY fecha DESC
      `;
      const values = [fechaInicio, fechaFin];
      const { rows } = await client.query(query, values);
      return rows.map((row) => new Humedad(row));
    } catch (error) {
      console.error("Error al obtener humedad por fechas: ", error);
      throw error;
    } finally {
      client.release();
    }
  }

  //Funcíon para mostrar datos por promedio de la fecha actual
  static async getPromedioPorFecha(fecha) {
    const client = await pool.connect();
    try {
      const query = `SELECT AVG(valor) AS promedio 
        FROM humedad 
        WHERE fecha::date = $1::date`;
      const values = [fecha];
      const { rows } = await client.query(query, values);
      return rows[0].promedio !== null ? parseFloat(rows[0].promedio) : 0;
    } catch (error) {
      console.error("Error al obtener promedio humedad:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}
