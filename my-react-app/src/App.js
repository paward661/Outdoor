import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Calendar from "./components/Calendar.js";
import Profile from "./components/Profile.js";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
    // <div>
    //   <Calendar />
    // </div>
  );
}

export default App;
