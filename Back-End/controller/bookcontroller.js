const user = require("../model/usermodel");
const book = require("../model/bookmodel");
const errorHandler = require("../utilis/error");

async function addbook(req, res, next) {
  const { id } = req.user;
  const { url, title, author, price, desc, language } = req.body;
  try {
    const finduser = await user.findById(id);
    if (finduser.role !== "Admin") {
      return next(errorHandler(500, "you are not allow to post this"));
    }
    if (!url || !title || !author || !price || !desc || !language) {
      return next(errorHandler(402, "plz provide your details"));
    }
    const payload = {
      url,
      title,
      author,
      price,
      desc,
      language,
    };
    const newbook = new book(payload);
    const savedata = await newbook.save();
    res.status(200).json({
      message: "successfully added",
      data: savedata,
      success: true,
      error: false,
    });
  } catch (error) {
    next(500, error.message);
  }
}
async function updatebook(req, res, next) {
  const { url, title, author, price, desc, language } = req.body;

  try {
    const updatebook = await book.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          url,
          title,
          author,
          price,
          desc,
          language,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "successfully updated",
      data: updatebook,
      success: true,
      error: false,
    });
  } catch (error) {
    next(500, error.message);
  }
}

async function deletepost(req, res, next) {
  if (req.user.role !== "Admin") {
    return next(errorHandler(400, "your are not athorize"));
  }
  try {
    await book.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    res.status(400).json({ message: error.mmessage });
  }
}
async function getallbooK(req, res, next) {
  try {
    const books = await book.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: "get the book", data: books });
  } catch (error) {
    next(errorHandler(401, error.message || "error occourd"));
  }
}
async function getrecentbook(req, res, next) {
  try {
    const books = await book.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({ message: "get the book", data: books });
  } catch (error) {
    next(errorHandler(401, error.message || "error occourd"));
  }
}
async function getbooKbyid(req, res, next) {
  const { Id } = req.params;

  try {
    const books = await book.findById(Id);
    return res.status(200).json({ message: "get the book", data: books });
  } catch (error) {
    next(errorHandler(401, error.message || "error occourd"));
  }
}

module.exports = {
  addbook,
  updatebook,
  deletepost,
  getallbooK,
  getbooKbyid,
  getrecentbook,
};
