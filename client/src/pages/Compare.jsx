// src/pages/Compare.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const Compare = () => {
  const [colleges, setColleges] = useState([]);
  const [college1, setCollege1] = useState(null);
  const [college2, setCollege2] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get("https://college-backend-x811.onrender.com/api/colleges", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setColleges(data);
    };
    fetch();
  }, []);

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">College Comparison</h1>
      <div className="flex justify-center gap-10 mb-10">
        <select onChange={(e) => setCollege1(colleges.find(c => c._id === e.target.value))} className="p-3 border rounded-xl bg-gray-50">
          <option>Select College 1</option>
          {colleges.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <select onChange={(e) => setCollege2(colleges.find(c => c._id === e.target.value))} className="p-3 border rounded-xl bg-gray-50">
          <option>Select College 2</option>
          {colleges.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>

      {college1 && college2 && (
        <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
          <table className="w-full text-center">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">Feature</th>
                <th className="p-4">{college1.name}</th>
                <th className="p-4">{college2.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="p-4 font-bold bg-gray-50">Fees</td><td>₹{college1.fees}</td><td>₹{college2.fees}</td></tr>
              <tr><td className="p-4 font-bold bg-gray-50">Rating</td><td>⭐{college1.rating}</td><td>⭐{college2.rating}</td></tr>
              <tr><td className="p-4 font-bold bg-gray-50">Placements</td><td>{college1.placements}</td><td>{college2.placements}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Compare;