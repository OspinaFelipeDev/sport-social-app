import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import './App.css';


function App() {
  return (
    <Router basename="/sport-social-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
