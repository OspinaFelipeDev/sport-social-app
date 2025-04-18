import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Choose from "./pages/Choose";
import Where from "./pages/Where";
import CreateAccount from "./pages/CreateAccount";
import Terms from "./pages/Terms";
import CompleteProfile from "./pages/CompleteProfile";
import Meeting from "./pages/Meeting";
import AssignPositions from "./pages/AssignPositions";
import Tasks from "./pages/Tasks";
import Participants from "./pages/Participants";
import FileMeeting from "./pages/FileMeeting";
import ParticipantCard from "./pages/ParticipantCard";
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
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/completeProfile" element={<CompleteProfile />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/assignPositions" element={<AssignPositions />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/fileMeeting" element={<FileMeeting />} />
        <Route path="/participantCars" element={<ParticipantCard />} />
      </Routes>
    </Router>
  );
}

export default App;
