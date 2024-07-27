const express = require("express");
const {
  addtofavourite,
  removefromfavourites,
  getfavouritebook,
} = require("../controller/favouritesController");
const verifyToken = require("../middleware/verifytoken");
const favouritesRouter = express.Router();

favouritesRouter.put("/addToFavourites/:bookid", verifyToken, addtofavourite);
favouritesRouter.delete(
  "/removefromfavourites/:bookid",
  verifyToken,
  removefromfavourites
);
favouritesRouter.get("/getfavouritebook", verifyToken, getfavouritebook);

module.exports = favouritesRouter;
