import React from "react";
import { GoogleLogout } from "react-google-login";
import "./navbar.scss";

const Profile = ({ user }) => {
  const onSuccess = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <div className="profile">
      <div>
        <img src={user.imageUrl} alt={user.givenName} />
        <h2>
          {user.givenName +
            " " +
            (user.familyName === undefined ? "" : user.familyName)}
        </h2>
      </div>
      <div className="loginButton">
        <GoogleLogout
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={onSuccess}
        />
      </div>
    </div>
  );
};

export default Profile;
