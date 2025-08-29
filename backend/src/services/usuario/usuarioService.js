import { pool } from "../../config/posgres/dataBase.js";
import UsuarioDao from "../../daos/user/usuarioDao.js";
import UsuarioRolDao from "../../daos/user/usuarioRolDao.js";
import UsuarioPermisoDao from "../../daos/user/usuarioPermisoDao.js";
import CredencialesDao from "../../daos/user/userCredenciales.js";
import EstadoUsuarioDao from "../../daos/user/userEstadoDao.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class UsuarioService {
  // Registrar usuario con roles y credenciales
  static async registrarUsuarioConRol(usuarioData, roles = []) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      //Obtener id_estado por nombre usando DAO
      let id_estado = null;
      if (usuarioData.estado) {
        const estadoObj = await EstadoUsuarioDao.obtenerEstadoPorNombre(
          usuarioData.estado
        );
        if (!estadoObj)
          throw new Error(`Estado '${usuarioData.estado}' no existe`);
        id_estado = estadoObj.id_estado;
      }

      //Crear usuario usando DAO, pasando el client para la transacción
      const usuario = await UsuarioDao.crearUsuario(
        { ...usuarioData, id_estado },
        client // asegúrate de modificar el DAO para aceptar client opcional
      );

      //Crear credenciales
      if (usuarioData.password) {
        const password_hash = await bcrypt.hash(usuarioData.password, 10);
        await CredencialesDao.crearCredenciales(
          usuario.id_usuario,
          password_hash,
          client // pasar client para la transacción
        );
      }

      //Asignar roles por nombre
      for (const roleName of roles) {
        const rolObj = await UsuarioRolDao.obtenerRolPorNombre(roleName);
        if (!rolObj) throw new Error(`Rol '${roleName}' no existe`);
        await UsuarioRolDao.asignarRolesAUsuario(
          usuario.id_usuario,
          rolObj.id_role,
          client // pasar client para la transacción
        );
      }

      await client.query("COMMIT");

      //Recuperar roles y permisos
      const rolesAsignados = await UsuarioRolDao.obtenerRolesDeUsuario(
        usuario.id_usuario
      );
      const permisosAsignados =
        await UsuarioPermisoDao.obtenerPermisosDeUsuario(usuario.id_usuario);

      return { ...usuario, roles: rolesAsignados, permisos: permisosAsignados };
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error transacción registrarUsuarioConRol:", error);
      throw error;
    } finally {
      client.release();
    }

    // Recuperar roles y permisos asignados
    const rolesAsignados = await UsuarioRolDao.obtenerRolesDeUsuario(
      usuario.id_usuario
    );
    const permisosAsignados = await UsuarioPermisoDao.obtenerPermisosDeUsuario(
      usuario.id_usuario
    );

    return { ...usuario, roles: rolesAsignados, permisos: permisosAsignados };
  }

  //Iniciar sesión
  static async login(email, password) {
    // 1. Buscar usuario por email
    const usuario = await UsuarioDao.obtenerUsuarioPorEmail(email);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    //Buscar credenciales
    const credenciales = await CredencialesDao.obtenerCredencialesPorUsuario(
      usuario.id_usuario
    );
    if (!credenciales) {
      throw new Error("Credenciales no encontradas");
    }

    //Validar contraseña
    const passwordValido = await bcrypt.compare(
      password,
      credenciales.password_hash
    );
    if (!passwordValido) {
      throw new Error("Contraseña incorrecta");
    }

    //Obtener roles y permisos
    const roles = await UsuarioRolDao.obtenerRolesDeUsuario(usuario.id_usuario);
    const permisos = await UsuarioPermisoDao.obtenerPermisosDeUsuario(
      usuario.id_usuario
    );

    //Armar objeto de usuario completo
    const usuarioCompleto = {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      dni: usuario.dni,
      celular: usuario.celular,
      roles,
      permisos,
    };

    //Generar JWT
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        roles,
        permisos,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30min" }
    );

    return { usuario: usuarioCompleto, token };
  }

  // Buscar usuarios y traer roles + permisos
  /*static async buscarUsuariosConDetalle(filtro) {
    const usuarios = await UsuarioDao.buscarUsuarios(filtro);

    const usuariosDetallados = await Promise.all(
      usuarios.map(async (u) => {
        const roles = await UsuarioRolDao.obtenerRolesDeUsuario(u.id_usuario);
        const permisos = await UsuarioPermisoDao.obtenerPermisosDeUsuario(
          u.id_usuario
        );
        return { ...u, roles, permisos };
      })
    );
    return usuariosDetallados;
  }/*

  // Obtener un usuario completo por dni
  /*static async obtenerUsuarioCompleto(dni) {
    const usuario = await UsuarioDao.obtenerUsuarioPorDni(dni);
    if (!usuario) return null;

    const roles = await UsuarioRolDao.obtenerRolesDeUsuario(dni);
    const permisos = await UsuarioPermisoDao.obtenerPermisosDeUsuario(dni);

    return { ...usuario, roles, permisos };
  }*/
}
