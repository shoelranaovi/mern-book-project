const express = require("express");
const user = require("../model/usermodel");
const verifyToken = require("../middleware/verifytoken");
const errorHandler = require("../utilis/error");

const cartRouter = express.Router();

cartRouter.put("/addTocard/:bookid", verifyToken, async (req, res, next) => {
  const { bookid } = req.params;
  const { id } = req.user;

  try {
    const finduser = await user.findById(id);
    const bookalreadyadd = finduser.card.includes(bookid);

    if (bookalreadyadd) {
      return next(errorHandler(400, "Book already added to card"));
    }
    const addcard = await user.findByIdAndUpdate(
      id,
      {
        $push: { card: bookid },
      },
      { new: true }
    );
    res.status(200).json({
      massage: "added successfully",
      data: addcard,
    });
  } catch (error) {
    console.log(error.massage);
    return next(errorHandler(401, error.massage || "some error occourd"));
  }
});
cartRouter.delete(
  "/removefromcard/:bookid",
  verifyToken,
  async (req, res, next) => {
    const { bookid } = req.params;
    const { id } = req.user;

    try {
      const finduser = await user.findById(id);
      const bookalreadyadd = finduser.card.includes(bookid);

      if (bookalreadyadd) {
        const removecard = await user.findByIdAndUpdate(
          id,
          {
            $pull: { card: bookid },
          },
          { new: true }
        );
        return res.status(200).json({
          massage: "successfully remove from card list",
          data: removecard,
        });
      } else {
        next(errorHandler(401, "no book found"));
      }
    } catch (error) {
      console.log(error.massage);
      return next(errorHandler(401, error.massage || "some error occourd"));
    }
  }
);
cartRouter.get("/getCard", verifyToken, async (req, res, next) => {
  const { id } = req.user;

  try {
    const finduser = await user.findById(id).populate("card");
    const cardlist = finduser.card;

    return res.status(200).json({
      massage: "card list",
      data: cardlist,
    });
  } catch (error) {
    console.log(error.massage);
    return next(errorHandler(401, error.massage || "some error occourd"));
  }
});
module.exports = cartRouter;
