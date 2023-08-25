import express from "express";
import { authController } from "../../controllers/auth-controller/index.js";

const router = express.Router();

router.post("/signup", authController.signUp);
// router.get("/verify/:verificationToken", authController.verify);

// router.post("/login", authController.signIn);

// router.get("/currentUser", authController.getCurrentUser);

// router.post("/logout", authController.logout);

// router.patch("/", authController.updateUser);

export { router };
