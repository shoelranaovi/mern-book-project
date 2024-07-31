const express = require("express");

const verifyToken = require("../middleware/verifytoken");
const {
  addbook,
  updatebook,
  deletepost,
  getallbooK,
  getbooKbyid,
  getrecentbook,
} = require("../controller/bookcontroller.js");

const bookrouter = express.Router();

bookrouter.post("/addbook", verifyToken, addbook);
bookrouter.put("/updatebook/:postId", updatebook);
bookrouter.delete("/deletepost/:postId", verifyToken, deletepost);
bookrouter.get("/getallbook", verifyToken, getallbooK);
bookrouter.get("/getrecentbook", getrecentbook);
bookrouter.get("/getbooKbyid/:Id", getbooKbyid);

module.exports = bookrouter;
