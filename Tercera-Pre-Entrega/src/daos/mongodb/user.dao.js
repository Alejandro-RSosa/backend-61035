import MongoDao from "./mongo.dao.js";
import { UserModel } from "./models/user.model.js";

export default class UserDaoMongo extends MongoDao {
  constructor() {
    super(UserModel);
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // async register(user) {
  //   try {
  //     const { email } = user;
  //     const existUser = await this.model.findOne({ email });
  //     if (!existUser) return await this.model.create(user);
  //     else return null;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async login(email, password) {
  //   try {
  //     return await this.model.findOne({ email, password });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}
