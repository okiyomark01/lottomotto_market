import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { SubCategory } from "../models/subCategoryModel.js";

// @desc create new SubCategory
// @router /api/subcategory/
// @access Private

export const createSubCategory = expressAsyncHandler(async (req, res) => {
    try {
        const newSubCategory = await SubCategory.create(req.body);
        res.status(201).json({ status: true, data: newSubCategory });
    } catch (error) {
        throw new AppError(error, 400);
    }
});

// @desc Get all SubCategory
// @router /api/subcategory/
// @access Public

export const getAllSubCategory = expressAsyncHandler(async (req, res) => {
    try {
        const subcategory = await SubCategory.find();
        res.status(201).json({ status: true, data: subcategory });
    } catch (error) {
        throw new AppError(error, 400);
    }
});

// @desc Get a SubCategory by slug
// @router /api/subcategory/:slug
// @access Public

export const getSubCategoryBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const subcategory = await SubCategory.findOne({ slug:req.params.slug });
        res.status(201).json({ status: true, data: subcategory });
    } catch (error) {
        throw new AppError(error, 400);
    }
});

// @desc Update a SubCategory
// @router /api/subcategory/:id
// @access Private

export const updateSubCategory = expressAsyncHandler(async (req, res) => {
    try {
        const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!subcategory) {
            throw new AppError("SubCategory Not Found!", 404);
        };
        res.status(201).json({ status: true, data: subcategory });
    } catch (error) {
        throw new AppError(error, 400);
    }
});

// @desc Delete a SubCategory
// @router /api/subcategory/:id
// @access Private

export const deleteSubCategory = expressAsyncHandler(async (req, res) => {
    try {
        const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (!subcategory) {
            throw new AppError("SubCategory Not Found!", 404);
        };
        res.status(201).json({ status: true, message: "SubCategory deleted successfully!" });
    } catch (error) {
        throw new AppError(error, 400);
    }
});