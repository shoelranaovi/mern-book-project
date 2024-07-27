const express = require("express");
const {
  signup,
  signin,
  getuserDetail,
  updateuser,
  signout,
} = require("../controller/usercontroller.js");
const verifyToken = require("../middleware/verifytoken");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/getuserDetail", verifyToken, getuserDetail);
router.put("/updateuser", verifyToken, updateuser);

module.exports = router;
