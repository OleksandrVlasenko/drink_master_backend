import express from "express";
import { subscribeController } from "../../controllers/subscribe-controller/index.js";

const router = express.Router();

router.post("/subscribe", subscribeController.subscribe);

export { router };
