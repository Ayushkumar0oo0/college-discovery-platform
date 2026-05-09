import { useNavigate } from "react-router-dom";

const CollegeCard = ({ college }) => {
  const navigate = useNavigate();

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("savedColleges")) || [];
    const isAlreadySaved = saved.find((c) => c._id === college._id);
    
    if (!isAlreadySaved) {
      saved.push(college);
      localStorage.setItem("savedColleges", JSON.stringify(saved));
      alert("College Saved!");
    } else {
      alert("Already saved!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all">
      <img src={college.image} alt={college.name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h2 className="text-xl font-bold">{college.name}</h2>
        <p className="text-gray-600">📍 {college.location}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-bold">₹{college.fees}</span>
          <span className="text-yellow-500 font-bold">⭐ {college.rating}</span>
        </div>
        <div className="flex gap-2 mt-4">
          <button 
            onClick={() => navigate(`/college/${college._id}`)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
          >
            View Details
          </button>
          <button onClick={handleSave} className="px-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            ♡
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;