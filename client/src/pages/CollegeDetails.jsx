import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem("userInfo"));
        const { data } = await axios.get(`https://college-backend-x811.onrender.com/api/colleges/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCollege(data);
      } catch (error) {
        console.error("Error loading details:", error);
      }
    };
    fetchDetail();
  }, [id]);

  if (!college) return <div className="text-center mt-20 text-xl font-bold">Loading Property Data...</div>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <img src={college.image} className="w-full h-72 object-cover" alt={college.name} />
        <div className="p-8">
          <h1 className="text-4xl font-bold text-blue-900">{college.name}</h1>
          <p className="text-gray-600 text-lg mt-2">Location: {college.location}</p>
          
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="p-4 bg-blue-50 rounded-2xl">
              <span className="block text-sm text-gray-500">Annual Fees</span>
              <span className="text-2xl font-bold text-blue-700">₹{college.fees}</span>
            </div>
            <div className="p-4 bg-yellow-50 rounded-2xl">
              <span className="block text-sm text-gray-500">Student Rating</span>
              <span className="text-2xl font-bold text-yellow-600">⭐ {college.rating}</span>
            </div>
            <div className="p-4 bg-green-50 rounded-2xl">
              <span className="block text-sm text-gray-500">Placement Rate</span>
              <span className="text-2xl font-bold text-green-700">{college.placements}</span>
            </div>
            <div className="p-4 bg-purple-50 rounded-2xl">
              <span className="block text-sm text-gray-500">Courses</span>
              <span className="text-lg font-semibold">{college.courses?.join(", ")}</span>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">About the Institution</h3>
            <p className="text-gray-700 leading-relaxed">{college.description || "Detailed description of academic excellence and campus life."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;