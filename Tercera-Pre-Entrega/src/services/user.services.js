import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createHash, isValidPassword, hasBeenMoreThanXTime } from "../utils.js";

const { userDao } = factory;
const { cartDao } = factory;
export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  generateToken(user, time = "5m") {
    const payload = {
      userId: user._id,
    };
    return jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: time });
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.dao.getByEmail(email);
      if (!existUser) {
        const cartUser = await cartDao.create({});
        if (
          email === process.env.EMAIL_ADMIN &&
          password === process.env.PASS_ADMIN
        ) {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            role: "admin",
            cart: cartUser._id,
          });
          return newUser;
        } else {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            cart: cartUser._id,
          });
          return newUser;
        }
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      if (userExist && passValid) {
        await this.updateLastConnection(userExist._id);
        return this.generateToken(userExist);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  getUserById = async (id) => {
    try {
      return await this.dao.getUserById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  async updateLastConnection(id) {
    return await this.update(id, { last_connection: new Date() });
  }

  async checkUsersLastConnection() {
    try {
      const usersInactive = [];
      const users = await this.dao.getAll();
      if (users.length > 0) {
        for (const user of users) {
          if (
            user.last_connection &&
            hasBeenMoreThanXTime(user.last_connection)
          ) {
            await this.update(user._id, {
              active: false,
            });
            usersInactive.push(user.email);
          }
          else {
            await this.update(user._id, {
              active: true,
            });
          }
        }
      }
      return usersInactive;
    } catch (error) {
      throw new Error(error);
    }
  }
}
