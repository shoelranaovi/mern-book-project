const express = require("express");
const ConnectDB = require("./Confiq/connectDB");
const router = require("./Route/userRoute");
const cookieParser = require("cookie-parser");
const bookrouter = require("./Route/bookRoute");
const favouritesRouter = require("./Route/favouriteRoute");
const cartRouter = require("./Route/card");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api", router);
app.use("/api/book", bookrouter);
app.use("/api/book", favouritesRouter);
app.use("/api/book", cartRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    message,
    statusCode,
    success: false,
  });
});

ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("connected to server");
  });
});
