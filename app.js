import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

import { router as AuthRouter } from "./routes/api/auth-router.js";
import { router as CoctailRouter } from "./routes/api/coctail-router.js";
import { router as SubscribeRouter } from "./routes/api/subscribe-router.js";
import { router as IngredientListRouter } from "./routes/api/ingredientsList-router.js";
import { router as GlassListRouter } from "./routes/api/glassList-router.js";
import { router as MyRecipesRouter } from "./routes/api/myRecipes-router.js";
import { router as favoriteRouter } from "./routes/api/favorite-router.js";
import { router as PopularRecipesRouter } from "./routes/api/popularRecipes-router.js";
import { router as CategoryListRouter } from "./routes/api/categoryList-router.js";


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", AuthRouter);
app.use("/api/recipes", CoctailRouter);
app.use("/api/subscribe", SubscribeRouter);
app.use("/api/category-list", CategoryListRouter);
app.use("/api/ingredients", IngredientListRouter);
app.use("/api/glass", GlassListRouter);
app.use("/api/own", MyRecipesRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/api/popular-recipe", PopularRecipesRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

export default app;
