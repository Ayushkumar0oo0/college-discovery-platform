import CollegeCard from "../components/CollegeCard";

const Saved = () => {
  const savedColleges =
    JSON.parse(
      localStorage.getItem(
        "savedColleges"
      )
    ) || [];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Saved Colleges
      </h1>

      {savedColleges.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {savedColleges.map(
            (college) => (
              <CollegeCard
                key={college._id}
                college={college}
              />
            )
          )}
        </div>
      ) : (
        <div className="text-center text-2xl text-gray-500">
          No saved colleges yet
        </div>
      )}
    </div>
  );
};

export default Saved;