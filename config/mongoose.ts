import mongoose from "mongoose";

export async function mongoConnect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ajatdarojat45");
    return "succeessfully connect to mongodb database";
  } catch (err) {
    return "Cannot connect to database";
  }
}

export function mongoDisconnect() {
  mongoose.disconnect();
}
