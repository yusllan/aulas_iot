import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authenticatte(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      message: "Acceso no autorizado. Token no proporcionado",
    });
  }

  // Validar que comience con "Bearer "
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Formato inválido. El header debe ser: Bearer <token>",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token no encontrado en el header" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    res.status(401).json({ message: "Token inválido" });
  }
}
