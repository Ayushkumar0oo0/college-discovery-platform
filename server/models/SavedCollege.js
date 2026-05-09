// server/models/SavedCollege.js
const mongoose = require("mongoose");
const savedCollegeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  college: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true }
}, { timestamps: true });
module.exports = mongoose.model("SavedCollege", savedCollegeSchema);