const mongoose = require("mongoose");

async function ConncetDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error, "Unable to connect with server");
  }
}

module.exports = ConncetDB;
