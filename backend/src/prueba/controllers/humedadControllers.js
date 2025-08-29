import dotenv from "dotenv";
import HumedadDao from "../daos/humedadDao.js";

dotenv.config();

export default class HumedadController {
  //Obtener todos los datos de humedad
  static async getHumedad(req, res) {
    try {
      const humedad = await HumedadDao.showHumedad();

      res.status(200).json(humedad);
    } catch (err) {
      console.error("Error en obtener datos de humedad: ", err);
      res.status(500).json({
        message: "Error al obtener datos de humedad",
        error: err.message,
      });
    }
  }

  //Obtener los datos por fecha
  static async getHumedadPorFecha(req, res) {
    const { fechaInicio, fechaFin } = req.query;

    try {
      // Validación: Fechas presentes
      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ message: "Ambas fechas son requeridas" });
      }

      const inicio = new Date(`${fechaInicio}T00:00:00`);
      const fin = new Date(`${fechaFin}T23:59:59.999`);

      if (isNaN(inicio) || isNaN(fin)) {
        return res.status(400).json({ message: "Formato de fecha inválido" });
      }

      if (inicio > fin) {
        return res.status(400).json({
          message: "La fecha de inicio no puede ser mayor que la fecha de fin",
        });
      }

      const datos = await HumedadDao.showTimeHumedad(
        inicio.toISOString(),
        fin.toISOString()
      );

      res.status(200).json({
        success: true,
        data: datos,
      });
    } catch (err) {
      console.error("Error al obtener datos por fecha: ", err);
      res.status(500).json({
        message: "Error al obtener datos por rango de fecha",
        error: err.message,
      });
    }
  }

  //Obtener los datos promedio de la fecha actual
  static async getPromedioHoy(req, res) {
    const { fecha } = req.query;
    try {
      if (!fecha) {
        return res.status(400).json({ message: "Fechas es requerida" });
      }

      const inicio = new Date(`${fecha}T00:00:00`);

      if (isNaN(inicio)) {
        return res.status(400).json({ message: "Formato de fecha inválido" });
      }

      const promedio = await HumedadDao.getPromedioPorFecha(
        inicio.toISOString()
      );

      const valorSeguro =
        promedio !== null && !isNaN(promedio)
          ? parseFloat(promedio.toFixed(2))
          : 0;

      res.status(200).json({ success: true, data: valorSeguro });
    } catch (error) {
      console.error("Error al obtener promedio de humedad:", error);
      res.status(500).json({ message: "Error interno", error: error.message });
    }
  }
}
