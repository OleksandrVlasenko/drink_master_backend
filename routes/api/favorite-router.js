import express from "express";
import { favoriteController } from "../../controllers/favorite-controller/index.js";

const router = express.Router();

router.post("/:id", favoriteController.addById);

router.post("/:id", favoriteController.removeById);

router.get("/", favoriteController.getAll);

export { router };
