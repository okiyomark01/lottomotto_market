import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./src/utils/utils.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { errorHandler, notFoundErrorHandler } from "./src/middlewares/errorHandler.js";
import userRouter from "./src/routes/userRoutes.js";
import vendorRouter from "./src/routes/vendorRoutes.js";

// Load Environment variables from .env file
dotenv.config();

// Connection to mongodb
dbConnect();

// Initialize Express App
const app = express();

// Middleware Setup
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Api routes
app.use("/api/user", userRouter);
app.use("/api/vendor", vendorRouter);


// Error Handler Middlewares
app.use(notFoundErrorHandler);
app.use(errorHandler);



// Starting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});