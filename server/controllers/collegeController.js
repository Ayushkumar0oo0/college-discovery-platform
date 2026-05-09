// server/controllers/collegeController.js
const College = require("../models/College");
const SavedCollege = require("../models/SavedCollege");

// 1. Get all colleges for the Home Page
const getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get a single college by ID (This fixes your View Detail issue)
const getSingleCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Admin: Create a new college entry (For your "Add College" form)
const createCollege = async (req, res) => {
  try {
    const newCollege = await College.create(req.body);
    res.status(201).json(newCollege);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4. User: Save a college to their personal profile
const saveCollege = async (req, res) => {
  try {
    const { collegeId } = req.body;
    const exists = await SavedCollege.findOne({ user: req.user.id, college: collegeId });
    
    if (exists) return res.status(400).json({ message: "Already saved" });
    
    await SavedCollege.create({ user: req.user.id, college: collegeId });
    res.status(201).json({ message: "Saved to MongoDB" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. User: Get their specific saved list
const getMySaved = async (req, res) => {
  try {
    const saved = await SavedCollege.find({ user: req.user.id }).populate("college");
    res.json(saved.map(s => s.college));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CRITICAL: Export ALL functions so the routes can use them
module.exports = { 
  getColleges, 
  getSingleCollege, 
  createCollege,
  saveCollege, 
  getMySaved 
};