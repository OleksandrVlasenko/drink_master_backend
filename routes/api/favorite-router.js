import express from "express";
import { favoriteController } from "../../controllers/favorite-controller/index.js";
import { authenticate, isValidId } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", authenticate, favoriteController.getAll);

router.patch(
	"/:id",
	authenticate,
	isValidId,
	favoriteController.changeFavorite,
);

export { router };
