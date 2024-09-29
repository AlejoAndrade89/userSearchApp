import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${query}`
      );
      setUsers(response.data.items);
    } catch (error) {
      console.error("Error fetching users:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          GitHub User Search
        </h1>
        <form className="mb-8" onSubmit={handleSearch}>
          <div className="flex justify-center">
            <input
              type="text"
              className="border border-gray-600 rounded-full p-3 w-80 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Search GitHub users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 bg-blue-601 hover:bg-blue-700 text-white p-3 rounded-full shadow-md"
              disabled={loading}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>

        {loading && <p className="text-center">Loading...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded shadow-md text-center"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="rounded-full w-24 mx-auto mb-4"
              />
              <h2 className="text-xl font-bold">{user.login}</h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
