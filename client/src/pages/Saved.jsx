import { useState } from "react";
import axios from "axios";

const Saved = () => {
  const [form, setForm] = useState({ 
    name: "", location: "", fees: "", rating: "", placements: "", image: "", description: "", courses: "" 
  });

  const handleSaveToDB = async (e) => {
    e.preventDefault();
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      // Convert courses string into an array
      const dataToSave = { ...form, courses: form.courses.split(",") };
      
      await axios.post("https://college-backend-x811.onrender.com/api/colleges/create", dataToSave, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("New college data successfully pushed to Home Page!");
      setForm({ name: "", location: "", fees: "", rating: "", placements: "", image: "", description: "", courses: "" });
    } catch (error) {
      alert("Failed to save to database");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-700">Database Entry Panel</h1>
      <form onSubmit={handleSaveToDB} className="bg-white p-8 rounded-3xl shadow-xl space-y-4">
        <input type="text" placeholder="College Name" className="w-full p-3 border rounded-xl" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input type="text" placeholder="Location" className="w-full p-3 border rounded-xl" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required />
        <input type="number" placeholder="Fees" className="w-full p-3 border rounded-xl" value={form.fees} onChange={e => setForm({...form, fees: e.target.value})} required />
        <input type="text" placeholder="Image URL" className="w-full p-3 border rounded-xl" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
        <input type="text" placeholder="Courses (comma separated)" className="w-full p-3 border rounded-xl" value={form.courses} onChange={e => setForm({...form, courses: e.target.value})} required />
        <textarea placeholder="Full Description" className="w-full p-3 border rounded-xl h-32" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        <button className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition shadow-lg">Save to Home Directory</button>
      </form>
    </div>
  );
};

export default Saved;