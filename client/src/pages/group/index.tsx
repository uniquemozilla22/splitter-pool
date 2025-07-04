import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  balance: number;
};

type Group = {
  id: string;
  name: string;
  members: User[];
  totalPool: number;
};

const AllGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch(() => setError("Failed to fetch groups"));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        All Groups
      </h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {groups.length === 0 && !error && (
        <div className="text-gray-600 text-center">No groups found.</div>
      )}
      <ul className="space-y-6">
        {groups.map((group) => (
          <li
            key={group.id}
            className="border rounded p-4 cursor-pointer hover:bg-blue-50 transition"
            onClick={() => navigate(`/groups/${group.id}`)}
          >
            <div className="font-semibold text-lg">{group.name}</div>
            <div>
              <b>ID:</b> {group.id}
            </div>
            <div>
              <b>Total Balance:</b> {group.totalPool}
            </div>
            <div>
              <b>Members:</b>
              <ul className="list-disc pl-6">
                {group.members.map((user) => (
                  <li key={user.id}>
                    {user.name} (ID: {user.id}) - Balance: {user.balance}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllGroups;
