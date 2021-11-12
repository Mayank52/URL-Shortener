const mongoose = require("mongoose");
const { DB_LINK: db } = require("./secrets");

// const db = process.env.DB_LINK;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
