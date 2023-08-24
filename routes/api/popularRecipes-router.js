import express from "express";
import { popularRecipesController } from "../../controllers/popularRecipes-controller/index.js";

const router = express.Router();

router.get("/", popularRecipesController.getPopularRecipes);

export { router };
