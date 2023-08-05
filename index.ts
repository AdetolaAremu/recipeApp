import express, { Application } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
const authRouter = require("./routes/authRoutes");
const commentRouter = require("./routes/commentRoute");
const recipeRouter = require("./routes/recipeRoute");

const app: Application = express();

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/globalErrorHandler");

app.use(helmet());

const limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limit);
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize()); // guard against sql injection
app.use(xss()); // guard against xss attacks

// serving static files
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === "development") {
  console.log("Development Mode 💥");
}

// routers should be here
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipes", recipeRouter);
app.use("/api/v1/comments", commentRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// global error handler for every request
app.use(globalErrorHandler);

module.exports = app;
