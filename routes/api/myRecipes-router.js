import express from "express";
import { myRecipesController } from "../../controllers/myRecipes-controller/index.js";

const router = express.Router();

router.post("/", myRecipesController.add);

router.post("/:id", myRecipesController.removeById);

router.get("/", myRecipesController.getAll);


export { router };
