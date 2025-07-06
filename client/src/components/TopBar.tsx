import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    // Check if the current path is nested under /groups
    const isNestedGroupPath = location.pathname.split("/").length >= 3;
    setShowBack(isNestedGroupPath);
  }, [location.pathname]);

  // Show back button for any nested route under /groups (e.g., /groups/123, /groups/create-group)
  return (
    <>
      {showBack && (
        <div className="fixed bg-gray-800 top-0 left-0 right-0 shadow-md z-50 h-14 flex items-center px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        </div>
      )}
    </>
  );
}

export default TopBar;
