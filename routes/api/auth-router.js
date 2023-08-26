import express from "express";
import { authController } from "../../controllers/auth-controller/index.js";
import { validateBody } from "../../middlewares/index.js";
import {
	userSingUpSchema,
	userSingInSchema,
	// userEmailVerifySchema,
} from "../../models/user.js";

const router = express.Router();

router.post("/signup", validateBody(userSingUpSchema), authController.signUp);

router.post("/signin", validateBody(userSingInSchema), authController.signIn);

// router.get("/currentUser", authController.getCurrentUser);

// router.post("/logout", authController.logout);

// router.patch("/", authController.updateUser);

export { router };
