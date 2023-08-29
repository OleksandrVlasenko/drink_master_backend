import express from "express";
import { ingredientsListController } from "../../controllers/ingredientsList-controller/index.js";
import { authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", authenticate, ingredientsListController.getAll);

export { router };
