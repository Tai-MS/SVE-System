import userClass from "./UserPersistence";
import User from "./UserModel";
import { Usuarios } from "./typesUser";

async function getAll() {
  try {
    return userClass.getAll();
  } catch (error) {
    return error;
  }
}

async function getUser(email: String) {
  try {
    return email;
  } catch (error) {
    return error;
  }
}

async function createUser(email: String) {
  try {
    return email;
  } catch (error) {
    return error;
  }
}

async function updateUser(email: String) {
  try {
    return email;
  } catch (error) {
    return error;
  }
}

async function login(email: string) {
  const date = new Date();

  return userClass.login(email);
}

async function disableUser(email: String) {
  try {
    return email;
  } catch (error) {
    return error;
  }
}

async function guardarUsuariosInportados(usuarios: Usuarios) {
  try {
    for (const usuario of usuarios) {
      const guardado = await User.create(usuario);
    }
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAll,
  getUser,
  login,
  createUser,
  updateUser,
  disableUser,
  guardarUsuariosInportados,
};
