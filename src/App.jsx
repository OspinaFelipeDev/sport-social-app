import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Choose from "./pages/Choose";
import Where from "./pages/Where";
import './App.css';


function App() {
  return (
    <Router basename="/sport-social-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/where" element={<Where />} />
      </Routes>
    </Router>
  );
}

export default App;
