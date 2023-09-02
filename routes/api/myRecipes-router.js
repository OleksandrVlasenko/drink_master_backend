import express from "express";
import { myRecipesController } from "../../controllers/myRecipes-controller/index.js";
import {
	validateBody,
	authenticate,
	isEmptyBody,
	upload,
	jsonParse,
} from "../../middlewares/index.js";
import { userRecipeAddSchemaJoi } from "../../models/cocktail.js";

const router = express.Router();

router.post(
	"/",
	authenticate,
	upload.single("imageOfRecipe"),
	isEmptyBody,
	jsonParse,
	validateBody(userRecipeAddSchemaJoi),
	myRecipesController.add,
);

router.delete("/:id", authenticate, myRecipesController.removeById);

router.get("/", authenticate, myRecipesController.getAll);

export { router };
