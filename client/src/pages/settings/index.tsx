import React from "react";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Settings
      </h2>
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
