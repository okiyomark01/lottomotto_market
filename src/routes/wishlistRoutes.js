import express from "express";
import { createWishlist, deleteWishlist, getAllWishlist, getWishlistById, updateWishlist } from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/", createWishlist);
wishlistRouter.get("/all", getAllWishlist);
wishlistRouter.get("/:id", getWishlistById);
wishlistRouter.put("/:id", updateWishlist);
wishlistRouter.delete("/:id", deleteWishlist);

export default wishlistRouter;