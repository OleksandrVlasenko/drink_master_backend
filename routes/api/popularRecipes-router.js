import express from "express";
import { popularRecipesController } from "../../controllers/popularRecipes-controller/index.js";
import { authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.get("/",authenticate, popularRecipesController.getPopularRecipes);

export { router };
