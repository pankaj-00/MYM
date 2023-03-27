import React, { useState, useEffect } from "react";
import "./daily_image.scss";

const DailyImage = () => {
  const [photo, setPhoto] = useState("");
  const [currUser, setCurrUser] = useState("Pankaj");

  useEffect(() => {
    const fetchPhoto = async () => {
      const res = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=8PczdXbeCwjvPfgWHA9SSxhcvPxrNOBWwvrTlaGF"
      );

      const data = await res.json();
      setPhoto(data);

      setCurrUser(JSON.parse(localStorage.getItem("curr_user")));
    };

    fetchPhoto();
  }, []);

  if (!photo) return <div></div>;

  return (
    <div className="container">
      {currUser ? (
        <img src={photo.url} alt={photo.title} />
      ) : (
        <h1>Please Sign In to see the daily image!!!</h1>
      )}
    </div>
  );
};

export default DailyImage;
