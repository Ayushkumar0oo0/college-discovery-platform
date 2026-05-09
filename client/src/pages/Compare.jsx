/* eslint-disable react-hooks/immutability */
import React, { useEffect, useState } from "react";

import axios from "axios";

const Compare = () => {
  const [colleges, setColleges] = useState([]);

  const [college1, setCollege1] = useState("");

  const [college2, setCollege2] = useState("");

  const [selectedCollege1, setSelectedCollege1] = useState(null);

  const [selectedCollege2, setSelectedCollege2] = useState(null);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const { data } = await axios.get(
        "https://college-backend-x811.onrender.com/api/colleges",
      );

      setColleges(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompare = () => {
    const firstCollege = colleges.find((college) => college._id === college1);

    const secondCollege = colleges.find((college) => college._id === college2);

    setSelectedCollege1(firstCollege);

    setSelectedCollege2(secondCollege);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-10">Compare Colleges</h1>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="grid md:grid-cols-2 gap-6">
          <select
            value={college1}
            onChange={(e) => setCollege1(e.target.value)}
            className="p-4 border rounded-xl"
          >
            <option value="">Select First College</option>

            {colleges.map((college) => (
              <option key={college._id} value={college._id}>
                {college.name}
              </option>
            ))}
          </select>

          <select
            value={college2}
            onChange={(e) => setCollege2(e.target.value)}
            className="p-4 border rounded-xl"
          >
            <option value="">Select Second College</option>

            {colleges.map((college) => (
              <option key={college._id} value={college._id}>
                {college.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCompare}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Compare Now
        </button>

        {selectedCollege1 && selectedCollege2 && (
          <div className="overflow-x-auto mt-10">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 border">Feature</th>

                  <th className="p-4 border">{selectedCollege1.name}</th>

                  <th className="p-4 border">{selectedCollege2.name}</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="p-4 border font-bold">Location</td>

                  <td className="p-4 border">{selectedCollege1.location}</td>

                  <td className="p-4 border">{selectedCollege2.location}</td>
                </tr>

                <tr>
                  <td className="p-4 border font-bold">Fees</td>

                  <td className="p-4 border">₹{selectedCollege1.fees}</td>

                  <td className="p-4 border">₹{selectedCollege2.fees}</td>
                </tr>

                <tr>
                  <td className="p-4 border font-bold">Rating</td>

                  <td className="p-4 border">⭐{selectedCollege1.rating}</td>

                  <td className="p-4 border">⭐{selectedCollege2.rating}</td>
                </tr>

                <tr>
                  <td className="p-4 border font-bold">Placements</td>

                  <td className="p-4 border">{selectedCollege1.placements}</td>

                  <td className="p-4 border">{selectedCollege2.placements}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
