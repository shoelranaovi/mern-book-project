const express = require("express");
const {
  signup,
  signin,
  getuserDetail,
  updateuser,
  signout,
  getalluser,
  deleteuser,
  updateuserrole,
} = require("../controller/usercontroller.js");
const verifyToken = require("../middleware/verifytoken");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/getuserDetail", verifyToken, getuserDetail);
router.get("/getalluser", verifyToken, getalluser);
router.put("/updateuser", verifyToken, updateuser);
router.put("/updateuserrole/:userId", verifyToken, updateuserrole);
router.delete("/deleteuser/:userId", verifyToken, deleteuser);
module.exports = router;
