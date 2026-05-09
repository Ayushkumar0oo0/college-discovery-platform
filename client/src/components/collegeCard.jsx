import { Link } from "react-router-dom";

const CollegeCard = ({ college }) => {
  const saveCollege = () => {
    const savedColleges =
      JSON.parse(
        localStorage.getItem(
          "savedColleges"
        )
      ) || [];

    const alreadySaved =
      savedColleges.find(
        (item) =>
          item._id === college._id
      );

    if (alreadySaved) {
      alert("College already saved");

      return;
    }

    savedColleges.push(college);

    localStorage.setItem(
      "savedColleges",
      JSON.stringify(savedColleges)
    );

    alert("College Saved");
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={college.image}
        alt={college.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold">
          {college.name}
        </h2>

        <p className="text-gray-600 mt-2">
          📍 {college.location}
        </p>

        <p className="mt-2">
          💰 Fees: ₹{college.fees}
        </p>

        <p className="mt-2">
          ⭐ Rating: {college.rating}
        </p>

        <div className="flex gap-3 mt-4">
          <Link
            to={`/college/${college._id}`}
          >
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              View Details
            </button>
          </Link>

          <button
            onClick={saveCollege}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            ❤️ Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;