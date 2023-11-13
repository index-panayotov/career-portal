"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [realName, setRealName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data = await response.json();
        setEmail(data.email);
        setRealName(data.realName);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    // Add your own logic to update the user's data
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 shadow-md p-6 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="realName"
              className="block text-sm font-medium text-gray-700"
            >
              Real Name
            </label>
            <input
              id="realName"
              type="text"
              value={realName}
              onChange={e => setRealName(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
            />
          </div>

          <button
            type="submit"
            className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
