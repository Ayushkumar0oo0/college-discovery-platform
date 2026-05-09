const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    fees: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    courses: [
      {
        type: String,
      },
    ],

    placements: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("College", collegeSchema);