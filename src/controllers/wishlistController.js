import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { Wishlist } from "../models/wishlistModel.js";

// @desc create new Wishlist
// @router /api/wishlist/
// @access Private

export const createWishlist = expressAsyncHandler(async (req, res) => {
    try {
        const newWishlist = await Wishlist.create(req.body);
        res.status(201).json({ status: true, data: newWishlist });
    } catch (error) {
        throw new AppError(error, 400);
    }
});

// @desc Get all Wishlist
// @router /api/wishlist/
// @access Public

export const getAllWishlist = expressAsyncHandler(async (req, res) => {
    try {
        const wishlist = await Wishlist.find();
        res.status(201).json({ status: true, data: wishlist });
    } catch (error) {
        throw new AppError(error, 400);
    }
});

// @desc Get a Wishlist by id
// @router /api/wishlist/:id
// @access Public

export const getWishlistById = expressAsyncHandler(async (req, res) => {
    try {
        const wishlist = await Wishlist.findById(req.params.id);
        res.status(201).json({ status: true, data: wishlist });
    } catch (error) {
        throw new AppError(error, 400);
    }
});

// @desc Update a Wishlist
// @router /api/wishlist/:id
// @access Private

export const updateWishlist = expressAsyncHandler(async (req, res) => {
    try {
        const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!wishlist) {
            throw new AppError("Wishlist Not Found!", 404);
        };
        res.status(201).json({ status: true, data: wishlist });
    } catch (error) {
        throw new AppError(error, 400);
    }
});

// @desc Delete a Wishlist
// @router /api/wishlist/:id
// @access Private

export const deleteWishlist = expressAsyncHandler(async (req, res) => {
    try {
        const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
        if (!wishlist) {
            throw new AppError("Wishlist Not Found!", 404);
        };
        res.status(201).json({ status: true, message: "Wishlist deleted successfully!" });
    } catch (error) {
        throw new AppError(error, 400);
    }
});