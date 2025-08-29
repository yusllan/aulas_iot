import UsuarioService from "../../services/usuario/usuarioService.js";
import UsuarioDao from "../../daos/user/usuarioDao.js";

export default class UsuarioController {
  // Crear usuario con roles y credenciales
  static async crearUsuario(req, res) {
    try {
      const { usuario, roles } = req.body;
      const nuevoUsuario = await UsuarioService.registrarUsuarioConRol(
        usuario,
        roles
      );
      return res
        .status(201)
        .json({ message: "Usuario creado correctamente", nuevoUsuario });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return res.status(500).json({ error: "Error al crear usuario" });
    }
  }

  // Actualizar datos personales
  static async actualizarUsuario(req, res) {
    const { id_usuario } = req.params;
    const userData = req.body;

    try {
      const usuarioActualizado = await UsuarioDao.actualizarUsuario(
        id_usuario,
        userData
      );
      return res.status(200).json(usuarioActualizado);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return res.status(500).json({ error: "Error al actualizar usuario" });
    }
  }

  // Eliminar usuario
  static async eliminarUsuario(req, res) {
    try {
      const id_usuario = parseInt(req.params.id, 10);
      if (isNaN(id_usuario)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
      }

      const resultado = await UsuarioDao.eliminarUsuario(id_usuario);
      if (!resultado) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res
        .status(200)
        .json({ message: "Usuario eliminado correctamente", resultado });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return res.status(500).json({ error: "Error al eliminar usuario" });
    }
  }

  // Cambiar contraseña
  static async cambiarPassword(req, res) {
    try {
      const { id_usuario } = req.params;
      const { nuevaPassword } = req.body;

      if (!nuevaPassword) {
        return res
          .status(400)
          .json({ error: "Debe enviar la nueva contraseña" });
      }

      const resultado = await UsuarioService.actualizarPassword(
        id_usuario,
        nuevaPassword
      );
      return res
        .status(200)
        .json({ message: "Contraseña actualizada correctamente", resultado });
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      return res
        .status(500)
        .json({ error: "Error al actualizar la contraseña" });
    }
  }

  //Iniciar sesión
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email y contraseña son requeridos" });
      }

      const result = await UsuarioService.login(email, password);

      return res.status(200).json({
        message: "Login exitoso",
        token: result.token,
        usuario: result.usuario,
      });
    } catch (error) {
      console.error("Error en login:", error.message);

      if (
        error.message === "Usuario no encontrado" ||
        error.message === "Credenciales no encontradas" ||
        error.message === "Contraseña incorrecta"
      ) {
        return res.status(401).json({ error: error.message });
      }

      return res.status(500).json({ error: "Error interno en el login" });
    }
  }

  //Mostrar usuarios
  static async obtenerUsuarios(req, res) {
    try {
      const usuarios = await UsuarioDao.obtenerUsuarios();
      res.status(200).json({ success: true, data: usuarios });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener usuarios",
        error: error.message,
      });
    }
  }
}
