import "./App.css";
import Navbar from "./components/Navbar/navbar";
import DailyImage from "./components/Image/daily_image";
import { useEffect } from "react";
import { gapi } from "gapi-script";

const App = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <div className="container">
      <Navbar />
      <DailyImage />
    </div>
  );
};

export default App;
