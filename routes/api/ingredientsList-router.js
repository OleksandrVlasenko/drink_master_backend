import express from "express";
import { ingredientsListController } from "../../controllers/ingredientsList-controller/index.js";

const router = express.Router();

router.post("/list", ingredientsListController.getIngredientsList);

export { router };