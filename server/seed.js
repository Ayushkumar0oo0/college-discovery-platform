const mongoose = require("mongoose");
const dotenv = require("dotenv");
const College = require("./models/College");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Distinct Image Arrays
const internationalImages = [
  "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg", // Classic library
  "https://images.pexels.com/photos/159740/library-la-trobe-study-students-159740.jpeg", // Modern campus
  "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg", // Old architecture
  "https://images.pexels.com/photos/1206101/pexels-photo-1206101.jpeg", // Large lecture hall
  "https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg" // University grounds
];

const indianImages = [
  "https://images.pexels.com/photos/356065/pexels-photo-356065.jpeg", // Tech lab
  "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg", // Students coding
  "https://images.pexels.com/photos/8197544/pexels-photo-8197544.jpeg", // Indian campus style
  "https://images.pexels.com/photos/7944111/pexels-photo-7944111.jpeg", // Study group
  "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg" // Modern Indian building
];

// Data Arrays for variety
const intLocations = ["New York, USA", "London, UK", "Toronto, Canada", "Sydney, Australia", "Berlin, Germany"];
const indLocations = ["Delhi, India", "Mumbai, India", "Bangalore, India", "Pune, India", "Chennai, India", "Hyderabad, India"];

const intCourses = [
  ["B.S. Computer Science", "M.S. Data Analytics", "Global MBA"],
  ["M.S. Artificial Intelligence", "B.A. Economics", "Cybersecurity"],
  ["B.S. Mechanical Engineering", "Robotics", "M.S. Finance"]
];

const indCourses = [
  ["B.Tech CSE", "B.Tech ECE", "M.Tech AI"],
  ["BBA", "MBA Finance", "MBA Marketing"],
  ["B.Sc Biotechnology", "B.Tech Mechanical", "Civil Engineering"]
];

const colleges = [];

// 1. Generate 25 International Colleges
for (let i = 1; i <= 25; i++) {
  colleges.push({
    name: `Global University of Technology & Sciences ${i}`,
    location: intLocations[i % intLocations.length],
    fees: 2500000 + (i * 150000), // High international fees (in INR)
    rating: (4.2 + Math.random() * 0.7).toFixed(1), // Ratings between 4.2 and 4.9
    courses: intCourses[i % intCourses.length],
    placements: `${90 + (i % 10)}%`, // Placements between 90% and 99%
    image: internationalImages[i % internationalImages.length],
    description: "A world-renowned international institution focusing on cutting-edge global research, diverse cultural experiences, and state-of-the-art laboratory facilities."
  });
}

// 2. Generate 50 Indian Colleges
for (let i = 1; i <= 50; i++) {
  colleges.push({
    name: `Indian Institute of Excellence ${i}`,
    location: indLocations[i % indLocations.length],
    fees: 150000 + (i * 25000), // Standard Indian fees
    rating: (3.5 + Math.random() * 1.3).toFixed(1), // Ratings between 3.5 and 4.8
    courses: indCourses[i % indCourses.length],
    placements: `${80 + (i % 20)}%`, // Placements between 80% and 99%
    image: indianImages[i % indianImages.length],
    description: "One of India's premier educational institutes, highly regarded for its rigorous academic curriculum, strong alumni network, and excellent campus placement records."
  });
}

// Import Function
const importData = async () => {
  try {
    // Clear existing data to avoid duplicates
    await College.deleteMany();
    
    // Insert the 75 new colleges
    await College.insertMany(colleges);
    
    console.log("Success: 75 Colleges Imported (25 International, 50 Indian)!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

// Execute
importData();