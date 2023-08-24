import express from "express";
import { coctailController } from "../../controllers/coctail-controller/index.js";

const router = express.Router();

router.get("/main-page", coctailController.getAll);

export { router };
