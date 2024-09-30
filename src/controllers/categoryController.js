import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { Category } from "../models/categoryModel.js";

// @desc create new Category
// @router /api/category/
// @access Private

export const createCategory = expressAsyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json({ status: true, data: newCategory });
    } catch (error) {
        throw new AppError(error, 400);
    }
});

// @desc Get all Category
// @router /api/category/
// @access Public

export const getAllCategory = expressAsyncHandler(async (req, res) => {
    try {
        const category = await Category.find();
        res.status(201).json({ status: true, data: category });
    } catch (error) {
        throw new AppError(error, 400);
    }
});

// @desc Get a Category by slug
// @router /api/category/:slug
// @access Public

export const getCategoryBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const category = await Category.findOne({ slug:req.params.slug });
        res.status(201).json({ status: true, data: category });
    } catch (error) {
        throw new AppError(error, 400);
    }
});

// @desc Update a Category
// @router /api/category/:id
// @access Private

export const updateCategory = expressAsyncHandler(async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!category) {
            throw new AppError("Category Not Found!", 404);
        };
        res.status(201).json({ status: true, data: category });
    } catch (error) {
        throw new AppError(error, 400);
    }
});

// @desc Delete a Category
// @router /api/category/:id
// @access Private

export const deleteCategory = expressAsyncHandler(async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            throw new AppError("Category Not Found!", 404);
        };
        res.status(201).json({ status: true, message: "Category deleted successfully!" });
    } catch (error) {
        throw new AppError(error, 400);
    }
});