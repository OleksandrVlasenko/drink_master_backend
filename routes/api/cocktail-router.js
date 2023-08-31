import express from "express";
import {authenticate, isValidId } from "../../middlewares/index.js";
import { cocktailController } from "../../controllers/cocktail-controller/index.js";

const router = express.Router();

router.get("/",authenticate, cocktailController.getAll);

router.get("/main-page",authenticate, cocktailController.getMainPage)

router.get("/:id",authenticate, isValidId, cocktailController.getById);

export { router };
