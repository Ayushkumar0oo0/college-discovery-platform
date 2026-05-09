import axios from "axios";
import { useNavigate } from "react-router-dom";

const CollegeCard = ({ college }) => {
  const navigate = useNavigate();

  const handleSave = async (e) => {
  e.stopPropagation();
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };

    await axios.post(
      "https://college-backend-x811.onrender.com/api/colleges/save",
      { collegeId: college._id },
      config
    );

    alert("College saved to your database profile!");
  } catch (error) {
    alert(error.response?.data?.message || "Error saving college");
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-200">
      <img src={college.image} alt={college.name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">{college.name}</h2>
        <p className="text-gray-600">📍 {college.location}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-bold">₹{college.fees}</span>
          <span className="text-yellow-500 font-bold">⭐ {college.rating}</span>
        </div>

        <div className="flex gap-2 mt-4">
          <button 
            onClick={() => navigate(`/college/${college._id}`)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
          >
            View Details
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold"
            title="Add to Saved"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;