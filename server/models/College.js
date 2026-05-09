const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    fees: { type: Number, required: true },
    rating: { type: Number, required: true },
    placements: { type: String, required: true },
    image: { type: String, required: true },
    courses: [{ type: String }],
    description: { type: String }, // Added for "View Details"
  },
  { timestamps: true },
);

module.exports = mongoose.model("College", collegeSchema);
