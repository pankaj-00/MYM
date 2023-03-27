import qs from "qs";
import axios from "axios";
import config from "./config.js";

export async function getGoogleOAuthTokens(code) {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: config.GOOGLE_CLIENT_ID,
    client_secret: config.GOOGLE_CLIENT_SECRET,
    redirect_uri: config.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  //   console.log(values);

  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error) {
    console.error(error.response.data.error);
    console.log(error, "Failed to fetch Google Oauth Tokens");
    throw new Error(error.message);
  }
}

export async function getGoogleUser({ id_token, access_token }) {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error, "Error fetching Google user");
    throw new Error(error.message);
  }
}
