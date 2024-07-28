import Services from "./class.services.js";
import UserDaoMongo from "../daos/mongodb/user.dao.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { createHash, isValidPassword } from "../utils.js";

const userDao = new UserDaoMongo();

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  generateToken(user, time = '5m') {
    const payload = {
      userId: user._id
    };
    return jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: time });
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.dao.getByEmail(email);
      if (!existUser) {
        if (email === process.env.EMAIL_ADMIN && password === process.env.PASS_ADMIN) {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            role: "admin",
          });
          return newUser;
        } else {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
          });
          return newUser;
        }
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  };

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      if(userExist && passValid) return this.generateToken(userExist);
    } catch (error) {
      throw new Error(error);
    }
  };
}

/*
export const getUserById = async (id) => {
  try {
    return await userDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await userDao.getByEmail(email);
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await getUserByEmail(email);
    if (!existUser) {
      if (email === "adminCoder@coder.com" && password === "adminCoder123") {
        const newUser = await userDao.register({
          ...user,
          password: createHash(password),
          role: "admin",
        });
        return newUser;
      } else {
        const newUser = await userDao.register({
          ...user,
          password: createHash(password),
        });
        return newUser;
      }
    } else return null;
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (user) => {
  try {
    const { email, password } = user;
    const userExist = await getUserByEmail(email);
    if (!userExist) return null;
    const passValid = isValidPassword(password, userExist);
    if (!passValid) return null;
    return userExist;
  } catch (error) {
    throw new Error(error);
  }
};
*/