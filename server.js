import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
dotenv.config();
const app = express();
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
// import mongoSanitize from "express-mongo-sanitize";
import connectDB from "./db/connect.js";
import { createServer } from "http";

//Routes
import authRouter from "./routes/authRoutes.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import approvalRouter from "./routes/approvalRoutes.js";

//middleware
import cors from "cors";
import { extractAuth, withAuth } from "./middleware/auth.js";
import errorHandlerMiddleware from "./middleware/error.handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

// Create HTTP server
const server = createServer(app);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cookieParser());
app.use(express.json());
// app.use(mongoSanitize()); // PRODUCTION

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(extractAuth);
app.use(cors(corsOptions));

app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/appointment", withAuth, appointmentRouter);
app.use("/api/v1/approvals", withAuth, approvalRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () => {
      console.log(`Server is listning ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
