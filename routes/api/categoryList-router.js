import express from "express";

import { categoryListController } from "../../controllers/categoryList-controller/index.js";
// import { authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", categoryListController.getAll);

export { router };
