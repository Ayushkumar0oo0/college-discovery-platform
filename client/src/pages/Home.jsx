import { useEffect, useState } from "react";

import axios from "axios";

import CollegeCard from "../components/collegeCard";

const Home = () => {
  const [colleges, setColleges] = useState([]);

  const [filteredColleges, setFilteredColleges] = useState([]);

  const [search, setSearch] = useState("");

  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const { data } = await axios.get(
          "https://college-backend-x811.onrender.com/api/colleges",
        );

        setColleges(data);

        setFilteredColleges(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchColleges();
  }, []);

  useEffect(() => {
    let filtered = colleges.filter((college) =>
      college.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (location !== "") {
      filtered = filtered.filter((college) => college.location === location);
    }

    setFilteredColleges(filtered);
  }, [search, location, colleges]);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Discover Top Colleges
      </h1>

      <div className="max-w-2xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search college..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl border border-gray-300 outline-none bg-white"
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mt-4 p-4 rounded-xl border border-gray-300 outline-none bg-white"
        >
          <option value="">All Locations</option>

          <option value="Delhi">Delhi</option>

          <option value="Bihar">Bihar</option>

          <option value="Rajasthan">Rajasthan</option>

          <option value="Mumbai">Mumbai</option>

          <option value="Bangalore">Bangalore</option>
        </select>
      </div>

      {filteredColleges.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredColleges.map((college) => (
            <CollegeCard key={college._id} college={college} />
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl text-gray-500 mt-20">
          No colleges found
        </div>
      )}
    </div>
  );
};

export default Home;
