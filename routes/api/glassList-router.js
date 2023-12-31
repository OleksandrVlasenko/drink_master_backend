import express from "express";
import { glassListController } from "../../controllers/glassList-controller/index.js";
import { authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", authenticate, glassListController.getAll);

export { router };
