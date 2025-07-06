import { FaPlusCircle, FaUsers, FaCog, FaHome } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isCreateGroup = location.pathname === "/groups/create-group";
  const isSettings = location.pathname === "/settings";

  return (
    <>
      <nav className="fixed bg-gray-800 bottom-0 left-0 right-0 flex items-center justify-around py-3 z-50 shadow-2xs  bg-blend-color">
        <NavLink
          to="/"
          className={`flex flex-col items-center text-sm ${
            location.pathname === "/" ? "text-blue-400" : ""
          }`}
        >
          <FaHome size={24} />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/groups"
          className={`flex flex-col items-center text-sm ${
            location.pathname.startsWith("/groups") ? "text-blue-400" : ""
          }`}
        >
          <FaUsers size={24} />
          <span>Groups</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={(navlink) =>
            `flex flex-col items-center text-sm ${
              navlink.isActive ? "text-blue-400" : ""
            }`
          }
        >
          <FaCog size={24} />
          <span>Settings</span>
        </NavLink>
      </nav>
      {/* Floating Plus Button (hide on create-group or settings route) */}
      {!isCreateGroup && !isSettings && (
        <button
          onClick={() => navigate("/groups/create-group")}
          className="fixed bottom-24 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-50 transition"
          aria-label="Add Group"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
        >
          <FaPlusCircle size={32} />
        </button>
      )}
    </>
  );
}

export default BottomNav;
