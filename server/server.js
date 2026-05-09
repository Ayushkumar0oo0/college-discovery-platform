const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: "https://college-discovery-platform-nine-delta.vercel.app",
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/colleges", require("./routes/collegeRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});