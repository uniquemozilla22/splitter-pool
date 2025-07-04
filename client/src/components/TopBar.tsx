import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Show back button for any nested route under /groups (e.g., /groups/123, /groups/create-group)
  const showBack =
    location.pathname.startsWith("/groups/") &&
    location.pathname !== "/groups/";

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow z-50 h-14 flex items-center px-4">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      )}
    </div>
  );
}

export default TopBar;
