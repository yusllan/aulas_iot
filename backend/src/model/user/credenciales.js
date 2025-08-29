export default class Credenciales {
  constructor({ id_credencial, id_usuario, password_hash }) {
    this.id_credencial = id_credencial;
    this.id_usuario = id_usuario;
    this.password_hash = password_hash;
  }
}
