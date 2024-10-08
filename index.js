import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./src/utils/utils.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { errorHandler, notFoundErrorHandler } from "./src/middlewares/errorHandler.js";
import userRouter from "./src/routes/userRoutes.js";
import vendorRouter from "./src/routes/vendorRoutes.js";
import productRouter from "./src/routes/productRoutes.js";
import brandRouter from "./src/routes/brandRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import subSubCategoryRouter from "./src/routes/subCategoryRoutes.js";
import wishlistRouter from "./src/routes/wishlistRoutes.js";
import reviewRouter from "./src/routes/reviewRoutes.js";
import uploadRouter from "./src/routes/uploadRoutes.js";
import orderRouter from "./src/routes/orderRoutes.js";
import supportRouter from "./src/routes/supportRoutes.js";


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
app.use("/api/product", productRouter);
app.use("/api/brand", brandRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subSubCategoryRouter);
app.use("/api/review", reviewRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/order", orderRouter);
app.use("/api/support", supportRouter);



// Error Handler Middlewares
app.use(notFoundErrorHandler);
app.use(errorHandler);



// Starting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});