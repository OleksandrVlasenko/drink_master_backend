import express from "express";
import { authController } from "../../controllers/auth-controller/index.js";

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.singUp);

router.get("/currentUser", authController.getCurrentUser);

router.post("/logout", authController.logout);

router.patch("/", authController.updateUser);

export { router };
