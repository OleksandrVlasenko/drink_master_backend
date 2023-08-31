import express from "express";
import { subscribeController } from "../../controllers/subscribe-controller/index.js";
import {validateBody} from "../../middlewares/validateBody.js"
import { subscriberSchema } from "../../models/subscribe.js";

const router = express.Router();

router.post("/", validateBody(subscriberSchema), subscribeController.subscribe);

export { router };
