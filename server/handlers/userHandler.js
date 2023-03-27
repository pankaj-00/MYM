import { findUser, createUser } from "../utils/userFunctions.js";

const userHandler = async (req, res) => {
  const result = req.body;

  const user = {
    name:
      result.givenName +
      " " +
      (result.familyName === undefined ? "" : result.familyName),
    email: result.email,
    profilePic: result.imageURL,
  };

  if ((await findUser({ email: user.email })) === null) {
    createUser(user);
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(user);
};

export default userHandler;
