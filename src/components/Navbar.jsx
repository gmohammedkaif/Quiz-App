import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdLogout } from "react-icons/md";
import { logout } from "../features/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.user?.email);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-nav-left">
        <span className="dashboard-logo">Quiz Master</span>

        <div className="dashboard-nav-links">
          <span className="nav-link" onClick={() => navigate("/dashboard")}>
            Dashboard
          </span>
          <span className="nav-link" onClick={() => navigate("/leaderboard")}>
            Leaderboard
          </span>
        </div>
      </div>

      <div className="dashboard-nav-right">
        <div className="dashboard-user-info">
          <span>{email}</span>
          <small>Active Player</small>
        </div>

        <div className="dashboard-avatar">
          {email ? email.slice(0, 2).toUpperCase() : "GU"}
        </div>

        <button className="dashboard-logout-btn" onClick={handleLogout}>
          <MdLogout /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
