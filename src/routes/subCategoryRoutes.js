import express from "express";
import { createSubCategory, deleteSubCategory, getAllSubCategorys, getSubCategoryBySlug, updateSubCategory } from "../controllers/subSubCategoryController.js";

const subSubCategoryRouter = express.Router();

subSubCategoryRouter.post("/", createSubCategory);
subSubCategoryRouter.get("/all", getAllSubCategorys);
subSubCategoryRouter.get("/:slug", getSubCategoryBySlug);
subSubCategoryRouter.put("/:id", updateSubCategory);
subSubCategoryRouter.delete("/:id", deleteSubCategory);

export default subSubCategoryRouter;