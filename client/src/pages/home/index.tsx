import React from "react";
import { useAuth } from "../../context/auth/authcontext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const auth = useAuth();
  const navigation = useNavigate();

  const navigate = (path: string) => {
    navigation(path);
  };
  return (
    <div className="flex flex-col justify-start h-full gap-6 p-4">
      <div>
        <h1 className="text-md">
          Welcome <span className="font-bold">{auth.user?.name}</span>
          {","}
        </h1>
        <div>
          <p className="text-sm text-gray-500">
            This is a simple app to manage your group expenses.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div className="flex flex-col justify-start h-full gap-4 p-4 rounded-lg shadow-2xl border border-gray-700">
          <h1 className="text-lg font-black text-gray-400">Active Groups</h1>
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-sm text-gray-500">
              You don't have any active groups yet. Create a group to get
              started.
            </p>
            <button
              className="px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => {
                navigate("/groups/create-group");
              }}
            >
              Create Group
            </button>
          </div>
        </div>
        <div className="flex flex-col h-full gap-2 p-4 rounded-lg shadow-2xl border border-gray-700">
          <h1 className="text-lg font-black text-gray-400">Active Tabs</h1>
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <p className="text-sm text-gray-500">
              You don't have any active tabs yet.
            </p>
            <button
              className="px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => {
                navigate("/groups/create-group");
              }}
            >
              Create Tab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
