import express from "express";
import { isValidId } from "../../middlewares/index.js";
import { coctailController } from "../../controllers/coctail-controller/index.js";

const router = express.Router();

router.get("/", coctailController.getAll);

router.get("/:id", isValidId, coctailController.getById);

export { router };
