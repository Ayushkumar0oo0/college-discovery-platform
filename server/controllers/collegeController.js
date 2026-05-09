const College = require("../models/College");

const getColleges = async (req, res) => {
  try {
    const colleges = await College.find();

    res.json(colleges);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({
        message: "College not found",
      });
    }

    res.json(college);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getColleges,
  getSingleCollege,
};