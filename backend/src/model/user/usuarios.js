export default class Usuario {
  constructor({
    id_usuario,
    nombre,
    apellido,
    email,
    dni,
    celular,
    fecha_registro,
    fecha_actualizacion,
    id_estado,
  }) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.dni = dni;
    this.celular = celular;
    this.fecha_registro = fecha_registro;
    this.fecha_actualizacion = fecha_actualizacion;
    this.id_estado = id_estado;
  }
}
