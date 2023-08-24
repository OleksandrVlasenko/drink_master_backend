import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";

import {router as authRouter} from "./routes/api/auth-router.js";
import { router as coctailRouter } from "./routes/api/coctail-router.js";
import { router as subscribeRouter } from "./routes/api/subscribe-router.js";
import { router as IngredientListRouter } from "./routes/api/ingredientsList-router.js";


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/coctails", coctailRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/ingredients", IngredientListRouter);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

export default app;
