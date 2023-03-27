import "./App.css";
import Navbar from "./components/Navbar/navbar";
import DailyImage from "./components/Image/daily_image";

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <DailyImage />
    </div>
  );
};

export default App;
