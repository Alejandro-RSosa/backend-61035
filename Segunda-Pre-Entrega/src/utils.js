import { dirname } from "path";
import { fileURLToPath } from "url";

<<<<<<< HEAD
export const __dirname = dirname(fileURLToPath(import.meta.url));

import bcrypt from "bcrypt";

/**
 * funcion que realiza el encriptado de contraseña a través de bcrypt con el método hashSync.
=======
export const __dirname = dirname(fileURLToPath(import.meta.url))

import bcrypt from 'bcrypt';


/**
 * funcion que realiza el encriptado de contraseña a través de bcrypt con el método hashSync. 
>>>>>>> fb67ca7f6384b8b169e31c7de4d920ac358b4240
 * Recibe password sin encriptar,
 * retorna password encriptada
 * @param password tipo string
 * @returns password encriptada/hasheada
 */
<<<<<<< HEAD
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
=======
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
>>>>>>> fb67ca7f6384b8b169e31c7de4d920ac358b4240

//despues tenemos el compareSync que toam la password sin hashear y la compara con la password ya hasheada
//en la base de datos, devuelve true o false si coincide o no

/**
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> fb67ca7f6384b8b169e31c7de4d920ac358b4240
 * @param {*} user usuario encontrado en base de datos.
 * @param {*} password contraseña proporcionada por el usuario, sin encriptar.
 * @returns boolean
 */
<<<<<<< HEAD
export const isValidPassword = (password, user) =>
  bcrypt.compareSync(password, user.password);
=======
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);
>>>>>>> fb67ca7f6384b8b169e31c7de4d920ac358b4240
