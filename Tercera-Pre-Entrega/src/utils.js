import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

import bcrypt from "bcrypt";

/**
 * funcion que realiza el encriptado de contraseña a través de bcrypt con el método hashSync.
 * Recibe password sin encriptar,
 * retorna password encriptada
 * @param password tipo string
 * @returns password encriptada/hasheada
 */
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//despues tenemos el compareSync que toam la password sin hashear y la compara con la password ya hasheada
//en la base de datos, devuelve true o false si coincide o no

/**
 *
 * @param {*} user usuario encontrado en base de datos.
 * @param {*} password contraseña proporcionada por el usuario, sin encriptar.
 * @returns boolean
 */
export const isValidPassword = (password, user) =>
  bcrypt.compareSync(password, user.password);

export const createResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({ data });
};

export const hasBeenMoreThanXTime = (lastConnectionDate) => {
  const dateNow = new Date();
  const diffMs = dateNow - lastConnectionDate;
  const hours48Ms = 48 * 60 * 60 * 1000; //48hs en ms
  const minMs = 60 * 1000; //1 minuto

  return diffMs > hours48Ms; //diferencia es mayor a 48hs en ms
};
