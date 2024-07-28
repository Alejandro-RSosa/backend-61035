import mongoose, { connect } from "mongoose";
import 'dotenv/config'

const MONGO_URL = process.env.MONGO_ATLAS_URL

export const initMongoDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await connect(MONGO_URL);
        console.log("Conectado a ATLAS DB");
    } catch (error) {
        console.log(error);
    }
};