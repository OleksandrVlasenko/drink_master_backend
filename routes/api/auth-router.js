import express from "express";
import { authController } from "../../controllers/auth-controller/index.js";
import { validateBody } from "../../middlewares/index.js";
import userSchemas from "../../schemas/user-schemas.js";

const router = express.Router();

router.post(
	"/signup",
	validateBody(userSchemas.userSingUpSchema),
	authController.signUp
);
// router.get("/verify/:verificationToken", authController.verify);

router.post(
	"/signin",
	validateBody(userSchemas.userSingInSchema),
	authController.signIn
);

// router.get("/currentUser", authController.getCurrentUser);

// router.post("/logout", authController.logout);

// router.patch("/", authController.updateUser);

export { router };
