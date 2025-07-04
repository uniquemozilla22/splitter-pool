import { FaPlusCircle, FaUsers, FaCog } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isCreateGroup = location.pathname === "/groups/create-group";
  const isSettings = location.pathname === "/settings";

  return (
    <>
      {/* Bottom Navigation with Groups and Settings */}
      <nav className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t flex justify-center items-center gap-16 py-3 z-50">
        <Link
          to="/groups"
          className={`flex flex-col items-center text-sm ${
            location.pathname.startsWith("/groups")
              ? "text-blue-700"
              : "text-gray-400"
          }`}
        >
          <FaUsers size={24} />
          <span>Groups</span>
        </Link>
        <Link
          to="/settings"
          className={`flex flex-col items-center text-sm ${
            isSettings ? "text-blue-700" : "text-gray-400"
          }`}
        >
          <FaCog size={24} />
          <span>Settings</span>
        </Link>
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
