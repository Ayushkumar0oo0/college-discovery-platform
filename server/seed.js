const mongoose = require("mongoose");

const dotenv = require("dotenv");

const College = require("./models/College");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const images = [
  "https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg",

  "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg",

  "https://images.pexels.com/photos/159740/library-la-trobe-study-students-159740.jpeg",

  "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
];

const locations = [
  "Delhi",
  "Bihar",
  "Rajasthan",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
];

const coursesList = [
  ["CSE", "ECE", "Mechanical"],

  ["AI", "Data Science", "Cyber Security"],

  ["Civil", "Electrical", "Chemical"],

  ["MBA", "BBA", "Economics"],

  ["Biotech", "Physics", "Mathematics"],
];

const colleges = [];

for (let i = 1; i <= 150; i++) {
  colleges.push({
    name: `College ${i}`,

    location:
      locations[i % locations.length],

    fees: 50000 + i * 1000,

    rating: (
      3.5 +
      Math.random() * 1.5
    ).toFixed(1),

    courses:
      coursesList[
        i % coursesList.length
      ],

    placements: `${
      80 + (i % 15)
    }%`,

    image: images[i % images.length],
  });
}

const importData = async () => {
  try {
    await College.deleteMany();

    await College.insertMany(colleges);

    console.log(
      "150 Colleges Imported Successfully"
    );

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

importData();