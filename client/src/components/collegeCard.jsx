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
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img src={college.image} alt={college.name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h2 className="text-xl font-bold">{college.name}</h2>
        <p className="text-gray-600">📍 {college.location}</p>
        <p className="text-blue-600 font-semibold mt-2">Fees: ₹{college.fees}</p>
        <div className="flex gap-2 mt-4">
          <button 
            onClick={() => navigate(`/college/${college._id}`)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm"
          >
            Details
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;