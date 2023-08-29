import express from "express";
import {authenticate, isValidId } from "../../middlewares/index.js";
import { coctailController } from "../../controllers/coctail-controller/index.js";

const router = express.Router();

router.get("/",authenticate, coctailController.getAll);

router.get("/main-page",authenticate, coctailController.getMainPage)

router.get("/:id",authenticate, isValidId, coctailController.getById);

export { router };
