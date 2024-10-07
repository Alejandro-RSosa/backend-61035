import { Schema, model } from "mongoose";

const usersCollectionName = "users";

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
  },
  isGoogle: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
    default: [],
  },
  last_connection: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export const UserModel = model(usersCollectionName, UserSchema);
