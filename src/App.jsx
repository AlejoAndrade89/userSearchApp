import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función de búsqueda automática
  useEffect(() => {
    const fetchUsers = async () => {
      if (query.trim() === "") {
        setUsers([]); // Limpiar resultados si el campo de búsqueda está vacío
        return;
      }

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

    // Configura un pequeño retraso para evitar demasiadas solicitudes mientras el usuario escribe
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500);

    // Limpiar el temporizador si el usuario sigue escribiendo
    return () => clearTimeout(delayDebounceFn);
  }, [query]); // Ejecuta el efecto cada vez que `query` cambia

  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-br from-purple-600 to-blue-500 p-5">
      <div className="w-full max-w-2xl bg-white bg-opacity-90 rounded-lg shadow-lg p-6 md:p-10 text-center mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-800">
          GitHub User Search
        </h1>
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <input
              type="text"
              className="border border-transparent rounded-full p-3 w-full md:w-3/4 bg-gray-100 text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-purple-300 focus:outline-none transition"
              placeholder="Search GitHub users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="ml-2 bg-purple-700 hover:bg-purple-900 text-white p-3 rounded-full shadow-lg transition"
              disabled={loading}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>

      {loading && <p className="text-gray-800">Loading...</p>}

      <div className="w-full max-w-4xl overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-lg shadow-xl text-center transition transform hover:scale-105"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="rounded-full w-20 mx-auto mb-4 border-4 border-purple-300"
            />
            <h2 className="text-xl font-bold text-gray-800">{user.login}</h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
