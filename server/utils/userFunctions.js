import mongoose from "mongoose";
import { User } from "../schema/userSchema.js";

export const createUser = async (input) => {
  try {
    await User.create(input);
    // console.log("New User created");
  } catch (e) {
    console.error(e);
  }
};

export const findUser = async (query) => {
  try {
    const user = await User.findOne(query).lean();
    return user;
  } catch (e) {
    console.error(e);
  }
};
