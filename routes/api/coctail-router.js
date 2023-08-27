import express from "express";
import { isValidId } from "../../middlewares/index.js";
import { coctailController } from "../../controllers/coctail-controller/index.js";
import { authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", authenticate, coctailController.getAll);

router.get("/:id", authenticate, isValidId, coctailController.getById);

export { router };
