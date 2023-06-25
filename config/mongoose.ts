import mongoose from "mongoose";

export async function mongoConnect() {
  try {
    await mongoose.connect(
      `${process.env.DB_URL}/${process.env.DB_NAME}_${process.env.NODE_ENV}`
    );
    return "succeessfully connect to mongodb database";
  } catch (err) {
    return "Cannot connect to database";
  }
}

export function mongoDisconnect() {
  mongoose.disconnect();
}
