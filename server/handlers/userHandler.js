import { findUser, createUser } from "../utils/userFunctions.js";

const userHandler = async (req, res) => {
  const result = JSON.parse(req.body);

  const user = {
    name:
      user.givenName +
      " " +
      (user.familyName === undefined ? "" : user.familyName),
    email: result.email,
    profilePic: user.imageURL,
  };

  if ((await findUser({ email: user.email })) === null) {
    createUser(user);
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(user);
};

export default userHandler;
