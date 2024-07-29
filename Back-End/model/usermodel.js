const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719014400&semt=ais_user",
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    favourites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "book",
      },
    ],
    card: [
      {
        type: mongoose.Types.ObjectId,
        ref: "book",
      },
    ],
    order: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
