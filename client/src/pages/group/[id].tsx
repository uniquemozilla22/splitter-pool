import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";

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

const FetchGroup: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Add user dialog state
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserError, setAddUserError] = useState("");

  const fetchGroup = async () => {
    setError("");
    setGroup(null);
    setSuccess("");
    setFetching(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}group/${id}`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Group not found");
        setFetching(false);
        return;
      }
      const data = await res.json();
      setGroup(data);
    } catch (err: any) {
      setError("Failed to fetch group");
    }
    setFetching(false);
  };

  React.useEffect(() => {
    if (id) fetchGroup();
    // eslint-disable-next-line
  }, [id]);

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!group) return;

    try {
      // Contribute for each user in the group
      const results = await Promise.all(
        group.members.map((user) =>
          fetch(import.meta.env.VITE_API_URL + "contribute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              groupId: id,
              userId: user.id,
              amount: Number(amount),
            }),
          })
        )
      );

      const failed = results.filter((res) => !res.ok);
      if (failed.length > 0) {
        setError("Some contributions failed.");
      } else {
        setSuccess("Pool successful!");
        setAmount("");
        fetchGroup();
        setShowDialog(false);
      }
    } catch {
      setError("Failed to pool");
    }
    setLoading(false);
  };

  // Add user logic
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddUserError("");
    setAddUserLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: id,
          name: newUserName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAddUserError(data.error || "Failed to add user");
      } else {
        setNewUserName("");
        setShowAddUserDialog(false);
        fetchGroup();
      }
    } catch {
      setAddUserError("Failed to add user");
    }
    setAddUserLoading(false);
  };

  // Skeleton component
  const Skeleton = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Group Details
      </h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}
      {/* Skeletons while fetching */}
      {fetching && (
        <div className="mt-4 space-y-4">
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-1/3 mx-auto" />
          <Skeleton className="h-4 w-1/4 mx-auto" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      )}
      {group && !fetching && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Group: {group.name}</h3>
          <p>
            <b>ID:</b> {group.id}
          </p>
          <p>
            <b>Total Balance:</b> {group.totalPool}
          </p>
          <div className="flex gap-2 mt-4 mb-2">
            {group.members.length > 0 ? (
              <button
                onClick={() => setShowDialog(true)}
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
              >
                Add to Pool
              </button>
            ) : (
              <button
                onClick={() => setShowAddUserDialog(true)}
                className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition"
              >
                Add User
              </button>
            )}
          </div>
          <h4 className="font-semibold mt-4 mb-2">Users</h4>
          {group.members.length === 0 ? (
            <div className="text-gray-500 mb-4">
              No users in this group yet.
            </div>
          ) : (
            <ul className="list-disc pl-5 mb-4">
              {group.members.map((user) => (
                <li key={user.id}>
                  {user.name} (ID: {user.id}) - Balance: {user.balance}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {!group && !error && !fetching && (
        <div className="text-gray-600 text-center">No group found.</div>
      )}

      {/* Add to Pool Dialog */}
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
            <button
              onClick={() => setShowDialog(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
              aria-label="Close"
            >
              ×
            </button>
            <Dialog.Title className="font-semibold mb-1 text-center">
              Add to Pool
            </Dialog.Title>
            <form
              onSubmit={handleContribute}
              className="flex flex-col gap-3 mt-2"
            >
              <input
                type="number"
                min={1}
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="border rounded px-3 py-2"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
              >
                {loading ? "Pooling..." : "Add to Pool"}
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog
        open={showAddUserDialog}
        onClose={() => setShowAddUserDialog(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
            <button
              onClick={() => setShowAddUserDialog(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
              aria-label="Close"
            >
              ×
            </button>
            <Dialog.Title className="font-semibold mb-1 text-center">
              Add User
            </Dialog.Title>
            <form onSubmit={handleAddUser} className="flex flex-col gap-3 mt-2">
              <input
                type="text"
                placeholder="User Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                required
                className="border rounded px-3 py-2"
              />
              {addUserError && (
                <div className="text-red-600 text-sm">{addUserError}</div>
              )}
              <button
                type="submit"
                disabled={addUserLoading}
                className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition"
              >
                {addUserLoading ? "Adding..." : "Add User"}
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default FetchGroup;
