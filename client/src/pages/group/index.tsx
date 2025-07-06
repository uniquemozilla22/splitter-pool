import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosBase from "../../api/base";
import type { Group } from "../../types";
import useLoadingContext from "../../hooks/useLoadingContext";
import { LoadingActionStrings } from "../../context/loading/loadingcontext";

const AllGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loading = useLoadingContext();

  useEffect(() => {
    loading.dispatchLoading(LoadingActionStrings.FETCHGROUPS, () =>
      axiosBase("groups")
        .then((res) => {
          console.log("Fetched groups:", res.data);
          setGroups(res.data);
        })
        .catch(() => setError("Failed to fetch groups"))
    );
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center ">All Groups</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {groups.length === 0 && !error && (
        <div className="text-gray-600 text-center">No groups found.</div>
      )}
      <ul className="space-y-6">
        {loading.loading.includes(LoadingActionStrings.FETCHGROUPS) &&
          Array.from({ length: 3 }).map((_, index) => (
            <GroupSkeleton key={index} />
          ))}
        {groups.map((group) => (
          <li
            key={group.id}
            className="border rounded p-4 cursor-pointer  transition w-full"
            onClick={() => navigate(`/groups/${group.id}`)}
          >
            <div className="font-semibold text-lg">{group.name}</div>
            <div>
              <b>ID:</b> {group.id}
            </div>
            <div>
              <b>Total Balance:</b> 0
            </div>
            <div>
              <b>Members:</b>
              <ul className="list-disc pl-6">
                {group.memberLinks.map((groupMemeber) => (
                  <li key={groupMemeber.id}>
                    {groupMemeber.user.name} (ID: {groupMemeber.userId}) -
                    Balance: {groupMemeber.user.contributed} contributed,{" "}
                    {groupMemeber.user.withdrawn} withdrawn
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

const GroupSkeleton: React.FC = () => {
  return (
    <div className="border rounded p-4 animate-pulse">
      <div className="h-6 bg-gray-200 mb-2 w-1/2"></div>
      <div className="h-4 bg-gray-200 mb-2 w-1/3"></div>
      <div className="h-4 bg-gray-200 mb-2 w-1/4"></div>
      <div className="h-8 bg-gray-200 mb-2"></div>
      <div className="h-8 bg-gray-200 mb-2"></div>
      <div className="h-8 bg-gray-200 mb-2"></div>
    </div>
  );
};

export default AllGroups;
