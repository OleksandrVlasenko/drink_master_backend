import express from "express";
import { myRecipesController } from "../../controllers/myRecipes-controller/index.js";
import { authenticate } from "../../middlewares/authenticate.js";

const router = express.Router();

router.post("/", authenticate, myRecipesController.add);

router.post("/:id", authenticate, myRecipesController.removeById);

router.get("/", authenticate, myRecipesController.getAll);

export { router };
