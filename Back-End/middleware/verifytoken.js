const errorHandler = require("../utilis/error");
const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: "token not found" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return next(errorHandler(error.message));
  }
}

module.exports = verifyToken;
