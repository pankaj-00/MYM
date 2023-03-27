import mongoose from "mongoose";
import config from "../config.js";

const connect = async () => {
  const dbUrl = config.dbUrl;

  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected!!");
  } catch (e) {
    console.error(e);
  }
};

export default connect;
