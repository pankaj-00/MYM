import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import Profile from "./profile";
import "./navbar.scss";

const Navbar = () => {
  const [currUser, setCurrUser] = useState();
  const onSuccess = async (res) => {
    localStorage.setItem("curr_user", JSON.stringify(res.profileObj));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(res.profileObj),
    };

    await fetch("https://mym-backend-95im.onrender.com/user", requestOptions);
    location.reload();
  };
  const onFailure = () => {
    location.reload();
  };

  useEffect(() => {
    setCurrUser(JSON.parse(localStorage.getItem("curr_user")));
  }, []);

  return (
    <div className="navbar">
      <h1>MYM Assessment</h1>
      {currUser ? (
        <Profile user={currUser} />
      ) : (
        <div className="loginButton">
          <GoogleLogin
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy="single_host_origin"
            isSignedIn={true}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
