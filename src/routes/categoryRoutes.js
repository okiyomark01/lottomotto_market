import express from "express";
import { createCategory, deleteCategory, getAllCategory, getCategoryBySlug, updateCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/all", getAllCategory);
categoryRouter.get("/:slug", getCategoryBySlug);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;