const express = require("express");

const router = express.Router();

const {
  getColleges,
  getSingleCollege,
} = require("../controllers/collegeController");

router.get("/", getColleges);

router.get("/:id", getSingleCollege);

module.exports = router;