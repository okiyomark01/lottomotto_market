import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createVendor, deleteVendor, getVendorBySlug, getVendors, updateVendor } from "../controllers/vendorController.js";


const vendorRouter = express.Router();

// Create a vendor route

vendorRouter.post("/", createVendor);

// Get vendors route

vendorRouter.get("/all", getVendors);

// Get vendor by slug route

vendorRouter.get("/:slug", getVendorBySlug);

// update vendor route

vendorRouter.put("/:id", updateVendor);

// update vendor route

vendorRouter.delete("/:id", deleteVendor);


export default vendorRouter;