const express = require("express");
const router = express.Router();
const { 
  getColleges, 
  getSingleCollege 
} = require("../controllers/collegeController");
const College = require("../models/College");
const { protect } = require("../middleware/authMiddleware");

/**
 * @description Get all colleges for the Home Page
 * @access Private (Wrapped in Login)
 */
router.get("/", protect, getColleges);

/**
 * @description Get single college details for the Detail Card
 * @access Private (Wrapped in Login)
 */
router.get("/:id", protect, getSingleCollege);

/**
 * @description Create a new college entry in MongoDB (from your Saved/Add page)
 * @access Private (Wrapped in Login)
 */
router.post("/create", protect, async (req, res) => {
  try {
    const { 
      name, 
      location, 
      fees, 
      rating, 
      placements, 
      image, 
      courses, 
      description 
    } = req.body;

    // Create the new college document in the collection
    const newCollege = await College.create({
      name,
      location,
      fees,
      rating,
      placements,
      image,
      courses,
      description
    });

    res.status(201).json(newCollege);
  } catch (error) {
    res.status(400).json({ 
      message: "Failed to create college", 
      error: error.message 
    });
  }
});

module.exports = router;