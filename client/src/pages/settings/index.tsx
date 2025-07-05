import React from "react";
import { FaSignOutAlt, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  return (
    <div className=" mx-auto mt-10 p-8 rounded-lg shadow-md w-full h-screen">
      <h2 className="text-2xl font-bold mb-6 text-start">Settings</h2>
      <button
        onClick={toggleTheme}
        className="btn btn-link btn-lg w-full transition"
      >
        <FaSun />
        Change Theme
      </button>
      <div className="divider text-sm opacity-30">user</div>
      <button
        onClick={handleLogout}
        className="btn btn-link btn-lg rounded px-4 py-2 transition w-full"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default Settings;
