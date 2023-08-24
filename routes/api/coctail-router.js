import express from "express";
import { coctailController } from "../../controllers/coctail-controller/index.js";

const router = express.Router();

router.get("/", coctailController.getAll);

export { router };
