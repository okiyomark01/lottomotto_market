import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createVendor } from "../controllers/vendorController.js";


const vendorRouter = express.Router();

// Create a vendor route

vendorRouter.post("/", protect, createVendor);

export default vendorRouter;