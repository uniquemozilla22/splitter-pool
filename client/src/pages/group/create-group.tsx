import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosBase from "../../api/base";

const CreateGroup: React.FC = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{ id: string; name: string } | null>(
    null
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    try {
      const res = await axiosBase.post("create-group", { name });
      const data = res.data;
      if (!res.data) {
        setError(data.error || "Failed to create group");
        return;
      }
      setResult(data);
      setName("");
      // Redirect to group's home page after creation
      navigate(`/groups/${data.id}`);
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="w-full md:max-w-2xl lg:max-w-md mx-auto mt-10 p-8 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Create a Group
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
        >
          Create
        </button>
      </form>
      {result && (
        <div className="mt-4 p-3 text-green-800 rounded text-center">
          Group created! <br />
          <span className="font-semibold">ID:</span> {result.id} <br />
          <span className="font-semibold">Name:</span> {result.name}
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 text-red-800 rounded text-center">{error}</div>
      )}
    </div>
  );
};

export default CreateGroup;
