import config from "../config.js";
import { getGoogleOAuthTokens, getGoogleUser } from "../services.js";
import { createUser, findUser } from "../utils/userFunctions.js";

const googleAuthHandler = async (req, res) => {
  const code = req.query.code;

  try {
    const { id_token, access_token } = await getGoogleOAuthTokens(code);

    const googleUser = await getGoogleUser({ id_token, access_token });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }

    const user = {
      name: googleUser.name,
      email: googleUser.email,
      profilePic: googleUser.picture,
    };

    if ((await findUser({ email: user.email })) === null) {
      createUser(user);
    }

    res.cookie("curr_user", user.email, {
      expires: new Date(Date.now() + 25892000000),
    });

    res.redirect(config.origin);
  } catch (error) {
    console.error(error, "Failed to authorize Google user");
    return res.redirect(`${config.origin}/oauth/error`);
  }
};

export default googleAuthHandler;
