import express from "express";
import { subscribeController } from "../../controllers/subscribe-controller/index.js";
import { validateBody, authenticate } from "../../middlewares/index.js";
import { subscriberSchema } from "../../models/index.js";

const router = express.Router();

router.post(
	"/",
	authenticate,
	validateBody(subscriberSchema),
	subscribeController.subscribe,
);

export { router };
