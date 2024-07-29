const user = require("../model/usermodel");
const errorHandler = require("../utilis/error.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(req, res, next) {
  const { username, email, password, address } = req.body;

  try {
    if ((!username, !email, !password)) {
      return next(errorHandler(401, "Plz provide your information"));
    }
    if (username.length < 4) {
      return next(
        errorHandler(401, "Plz provide your username more then 4 charactor")
      );
    }
    if (password.length <= 4) {
      return next(
        errorHandler(401, "Plz provide your password more then 4 charactor")
      );
    }
    const existinguserEmail = await user.findOne({ email });
    if (existinguserEmail) {
      return next(errorHandler(401, "This email address are already register"));
    }
    const existingusername = await user.findOne({ username });
    if (existingusername) {
      return next(errorHandler(401, "This username are already register"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const payload = {
      ...req.body,
      password: hash,
    };
    const newuser = new user(payload);
    const savedate = await newuser.save();

    res.status(200).json({
      message: "User Create Successfully",
      user: savedate,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message || "error" });
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(errorHandler(401, "Plz provide your email and password"));
    }
    const finduser = await user.findOne({ email });

    if (!finduser) {
      return next(errorHandler(401, "Invalid email or password"));
    }
    const isMatch = await bcrypt.compareSync(password, finduser.password);
    if (!isMatch) {
      return next(errorHandler(401, "Invalid  password"));
    } else {
      const tokendata = {
        id: finduser._id,
        email: finduser.email,
        role: finduser.role,
      };
      const token = jwt.sign(tokendata, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      const tokenoption = {
        httpOnly: true,
        securce: true,
      };
      const userinfromation = {
        id: finduser._id,
        email: finduser.email,
        role: finduser.role,
        avatar: finduser.avatar,
      };
      res.status(201).cookie("token", token, tokenoption).json({
        message: "successfully login",
        data: userinfromation,
        success: true,
        error: false,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message || "error" });
  }
}

async function getalluser(req, res, next) {
  const { role } = req.user;

  if (role !== "Admin") {
    return next(errorHandler(400, "your are not authorize "));
  }

  try {
    const alluser = await user.find();
    return res.status(200).json({
      data: alluser,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return next(errorHandler(400, error.massage));
  }
}
async function deleteuser(req, res, next) {
  if (req.user.role !== "Admin") {
    return next(errorHandler(400, "your are not athorize"));
  }

  if (req.user.id === req.params.userId) {
    return next(errorHandler(400, "you can not delete userself"));
  }
  try {
    await user.findByIdAndDelete(req.params.userId);
    res.status(200).json("The user has been deleted");
  } catch (error) {
    res.status(400).json({ message: error.mmessage });
  }
}
async function getuserDetail(req, res, next) {
  const { email } = req.user;
  try {
    const finduser = await user.findOne({ email });
    const userinformation = {
      username: finduser.username,
      email: finduser.email,
      role: finduser.role,
      avatar: finduser.avatar,
    };
    console.log(userinformation);
    res.status(200).json({
      message: "user information found",
      data: userinformation,
      success: true,
      error: false,
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
}
async function updateuser(req, res, next) {
  const { id } = req.user;
  const { username, email, password, image } = req.body;

  try {
    if (username.length < 7) {
      return next(
        errorHandler(400, "your name should be greater then 7 charactor ")
      );
    }
    if (username.includes(" ")) {
      return next(errorHandler(400, "No space are allow"));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(401, "all charactor should be lowecase"));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, "only alphanumeric charactor are allow"));
    }
    if (password && password?.length < 5) {
      return next(errorHandler(400, "password length should be 6 or more"));
    }
    const hashpass = bcrypt.hashSync(password, 10);
    const updateuser = await user.findByIdAndUpdate(
      id,
      {
        $set: {
          username,
          email,
          image,
          password: hashpass,
        },
      },
      { new: true }
    );

    const update = {
      username: updateuser.username,
      email: updateuser.email,
      avatar: updateuser.avatar,
      role: updateuser.role,
    };
    res.status(201).json({
      data: update,
      message: "successfully update ",
      success: true,
      error: false,
    });
  } catch (error) {
    return next(errorHandler(401, error.message));
  }
}
async function updateuserrole(req, res, next) {
  const { role } = req.body;

  if (req.user.id === req.params.userId) {
    return next(errorHandler(400, "you can not update userself"));
  }

  try {
    const updateuser = await user.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          role,
        },
      },
      { new: true }
    );

    const update = {
      username: updateuser.username,
      email: updateuser.email,
      avatar: updateuser.avatar,
      role: updateuser.role,
    };
    res.status(201).json({
      data: update,
      message: "successfully update ",
      success: true,
      error: false,
    });
  } catch (error) {
    return next(errorHandler(401, error.message));
  }
}

async function signout(req, res) {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "SIGN out COMPLETE",
      data: [],
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = {
  signup,
  signin,
  getuserDetail,
  updateuser,
  signout,
  getalluser,
  deleteuser,
  updateuserrole,
};
