import React from "react";
import Login from './pages/Login'
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Leaderboard from "./pages/Leaderboard";
import {BrowserRouter, Route, Routes} from "react-router-dom"


const App = () => {
  
  return <div>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />}/>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/quiz" element={<Quiz />} />
    <Route path="/result" element={<Result />} />
    <Route path="/leaderboard" element={<Leaderboard />} />

  </Routes>
  </BrowserRouter>


    </div>;
};

export default App;
