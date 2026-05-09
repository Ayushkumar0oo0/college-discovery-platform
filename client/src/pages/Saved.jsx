import { useState } from "react";
import axios from "axios";

const Saved = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    fees: "",
    rating: "",
    placements: "",
    image: "",
    description: "",
    courses: "",
  });

  const handleSaveToDB = async (e) => {
    e.preventDefault();
    try {
      // Get the token from local storage
      const userInfoStr = localStorage.getItem("userInfo");
      if (!userInfoStr) {
        alert("Please login first!");
        return;
      }
      const { token } = JSON.parse(userInfoStr);

      // 1. FORMAT THE DATA FOR MONGOOSE
      // We force fees and ratings to be Numbers, and split the courses string into an array
      const dataToSave = {
        ...form,
        fees: Number(form.fees),
        rating: Number(form.rating),
        courses: form.courses.split(",").map((course) => course.trim()),
      };

      // 2. SEND TO BACKEND
      await axios.post(
        "https://college-backend-x811.onrender.com/api/colleges/create",
        dataToSave,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 3. SUCCESS UI
      alert("New college data successfully pushed to Home Page!");

      // Clear the form after a successful save
      setForm({
        name: "",
        location: "",
        fees: "",
        rating: "",
        placements: "",
        image: "",
        description: "",
        courses: "",
      });

    } catch (error) {
      // 4. ERROR HANDLING
      console.error("Full Backend Error:", error.response?.data);
      
      // Grab the exact message Mongoose sends back so you know exactly what field failed
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to save to database";
        
      alert(`Backend rejected the data: ${errorMessage}`);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-700">
        Database Entry Panel
      </h1>
      
      <form
        onSubmit={handleSaveToDB}
        className="bg-white p-8 rounded-3xl shadow-xl space-y-5 border border-gray-100"
      >
        <input
          type="text"
          placeholder="College Name"
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        
        <input
          type="text"
          placeholder="Location (e.g. Mumbai, India)"
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        
        <input
          type="number"
          placeholder="Fees (Numbers only, e.g. 150000)"
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50"
          value={form.fees}
          onChange={(e) => setForm({ ...form, fees: e.target.value })}
          required
        />
        
        <input
          type="number"
          step="0.1"
          placeholder="Rating (e.g. 4.5)"
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          required
        />
        
        <input
          type="text"
          placeholder="Placements (e.g. 95%)"
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50"
          value={form.placements}
          onChange={(e) => setForm({ ...form, placements: e.target.value })}
          required
        />
        
        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />
        
        <input
          type="text"
          placeholder="Courses (comma separated, e.g. CSE, ECE, AI)"
          className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-gray-50"
          value={form.courses}
          onChange={(e) => setForm({ ...form, courses: e.target.value })}
          required
        />
        
        <textarea
          placeholder="Full Description"
          className="w-full p-4 border rounded-xl h-32 focus:ring-2 focus:ring-green-500 outline-none bg-gray-50"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        
        <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-lg mt-4">
          Save to Home Directory
        </button>
      </form>
    </div>
  );
};

export default Saved;