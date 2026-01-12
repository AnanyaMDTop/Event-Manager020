const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/EVManager");
  console.log("MongoDB Connected");
};

module.exports = connectDB;
