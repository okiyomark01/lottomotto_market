import express from "express";
import { createSubCategory, deleteSubCategory, getAllSubCategory, getSubCategoryBySlug, updateSubCategory } from "../controllers/subCategoryController.js";

const subSubCategoryRouter = express.Router();

subSubCategoryRouter.post("/", createSubCategory);
subSubCategoryRouter.get("/all", getAllSubCategory);
subSubCategoryRouter.get("/:slug", getSubCategoryBySlug);
subSubCategoryRouter.put("/:id", updateSubCategory);
subSubCategoryRouter.delete("/:id", deleteSubCategory);

export default subSubCategoryRouter;