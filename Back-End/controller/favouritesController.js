const book = require("../model/bookmodel");
const errorHandler = require("../utilis/error");
const user = require("../model/usermodel");

async function addtofavourite(req, res, next) {
  const { bookid } = req.params;
  const { id } = req.user;

  try {
    const finduser = await user.findById(id);
    const bookalreadyadd = finduser.favourites.includes(bookid);

    if (bookalreadyadd) {
      return next(errorHandler(400, "Book already added to favourite list"));
    }
    const addbook = await user.findByIdAndUpdate(
      id,
      {
        $push: { favourites: bookid },
      },
      { new: true }
    );
    res.status(200).json({
      massage: "added successfully",
      data: addbook,
    });
  } catch (error) {
    console.log(error.massage);
    return next(errorHandler(401, error.massage || "some error occourd"));
  }
}
async function removefromfavourites(req, res, next) {
  const { bookid } = req.params;
  const { id } = req.user;

  try {
    const finduser = await user.findById(id);
    const bookalreadyadd = finduser.favourites.includes(bookid);

    if (bookalreadyadd) {
      const addbook = await user.findByIdAndUpdate(
        id,
        {
          $pull: { favourites: bookid },
        },
        { new: true }
      );
      return res.status(200).json({
        massage: "successfully remove from favourite list",
        data: addbook,
      });
    } else {
      next(errorHandler(401, "no book found"));
    }
  } catch (error) {
    console.log(error.massage);
    return next(errorHandler(401, error.massage || "some error occourd"));
  }
}
async function getfavouritebook(req, res, next) {
  const { id } = req.user;

  try {
    const finduser = await user.findById(id).populate("favourites");
    const favouritebooklist = finduser.favourites;
    console.log(favouritebooklist);

    return res.status(200).json({
      massage: "favourite list",
      data: favouritebooklist,
    });
  } catch (error) {
    console.log(error.massage);
    return next(errorHandler(401, error.massage || "some error occourd"));
  }
}
module.exports = { addtofavourite, removefromfavourites, getfavouritebook };
