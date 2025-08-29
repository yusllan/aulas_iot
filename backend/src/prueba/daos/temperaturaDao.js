import { pool } from "../../config/posgres/dataBase.js";
import Temperatura from "../model/temperaturaModel.js";

export default class TemperaturaDao {
  static async create(temperaturaData) {
    const { dispositivo, valor } = temperaturaData;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const query = `INSERT INTO temperatura (dispositivo, valor) VALUES ($1, $2) 
      RETURNING *`;

      const values = [dispositivo, valor];
      const { rows } = await client.query(query, values);
      await client.query("COMMIT");
      return new Temperatura(rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error en la creación de temperatura: ", error);
      throw error;
    } finally {
      client.release();
    }
  }

  //Función para mostrar datos de temperatura
  static async showTemperatura() {
    const client = await pool.connect();
    try {
      const query = `
      SELECT * 
      FROM temperatura 
      ORDER BY fecha DESC 
      LIMIT 20
    `;
      const { rows } = await client.query(query);
      return rows.map((row) => new Temperatura(row));
    } catch (error) {
      console.error("Error al obtener datos de temperatura: ", error);
      throw error;
    } finally {
      client.release();
    }
  }

  //Función para mostrar datos de temperatura por fecha
  static async showTimeTemperatura(fechaInicio, fechaFin) {
    const client = await pool.connect();
    try {
      const query = `
      SELECT * FROM temperatura 
      WHERE fecha BETWEEN $1 AND $2 
      ORDER BY fecha DESC
    `;
      const values = [fechaInicio, fechaFin];
      const { rows } = await client.query(query, values);
      return rows.map((row) => new Temperatura(row));
    } catch (error) {
      console.error("Error al obtener temperatura por fechas: ", error);
      throw error;
    } finally {
      client.release();
    }
  }

  //función para mostrar datos por promedio de la fecha actual
  static async getPromedioPorFecha(fecha) {
    const client = await pool.connect();
    try {
      const query = `SELECT AVG(valor) AS promedio 
        FROM temperatura 
        WHERE fecha::date = $1::date
      `;

      const values = [fecha];
      const { rows } = await client.query(query, values);
      return rows[0].promedio !== null ? parseFloat(rows[0].promedio) : 0;
    } catch (error) {
      console.error("Error al obtener promedio temperatura:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}
