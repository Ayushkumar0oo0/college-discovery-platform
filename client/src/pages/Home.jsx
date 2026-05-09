import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [colleges, setColleges] = useState([]);
  
  // State for our two search bars
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  
  const navigate = useNavigate();

  // Fetch all colleges on page load
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const userInfoStr = localStorage.getItem("userInfo");
        if (!userInfoStr) return; // ProtectedRoute will handle redirecting

        const { token } = JSON.parse(userInfoStr);
        const { data } = await axios.get(
          "https://college-backend-x811.onrender.com/api/colleges",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setColleges(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchColleges();
  }, []);

  // Filter the colleges based on BOTH the name and the city
  const filteredColleges = colleges.filter((college) => {
    const matchesName = college.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesCity = college.location.toLowerCase().includes(searchCity.toLowerCase());
    
    // A college will only show up if it matches BOTH search fields
    return matchesName && matchesCity;
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">
        College Directory
      </h1>

      {/* --- SEARCH SECTION --- */}
      <div className="max-w-4xl mx-auto mb-10 grid md:grid-cols-2 gap-4">
        {/* Search by Name */}
        <input
          type="text"
          placeholder="🔍 Search by College Name..."
          className="w-full p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        {/* Search by City */}
        <input
          type="text"
          placeholder="📍 Search by City (e.g., London, Pune)..."
          className="w-full p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
      </div>

      {/* --- RESULTS SECTION --- */}
      {filteredColleges.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredColleges.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <img
                src={c.image}
                className="h-48 w-full object-cover rounded-xl"
                alt={c.name}
              />
              <h2 className="text-xl font-bold mt-4">{c.name}</h2>
              <p className="text-gray-500 mt-1">📍 {c.location}</p>
              
              <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-bold text-lg">₹{c.fees}</span>
                  <span className="text-yellow-500 font-bold">⭐ {c.rating}</span>
              </div>

              <button
                onClick={() => navigate(`/college/${c._id}`)}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* What to show if no colleges match the search */
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-gray-500">
            No colleges found matching your search.
          </h2>
          <p className="text-gray-400 mt-2">Try adjusting your filters!</p>
        </div>
      )}
    </div>
  );
};

export default Home;