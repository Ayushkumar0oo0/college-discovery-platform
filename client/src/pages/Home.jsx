import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem("userInfo"));
        const { data } = await axios.get("https://college-backend-x811.onrender.com/api/colleges", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setColleges(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchColleges();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">College Directory</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {colleges.map((c) => (
          <div key={c._id} className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
            <img src={c.image} className="h-40 w-full object-cover rounded-xl" alt={c.name} />
            <h2 className="text-xl font-bold mt-4">{c.name}</h2>
            <p className="text-gray-500">📍 {c.location}</p>
            <button 
              onClick={() => navigate(`/college/${c._id}`)} 
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;