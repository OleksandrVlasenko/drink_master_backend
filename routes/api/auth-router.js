import express from "express";
import { authController } from "../../controllers/auth-controller/index.js";
import {
	validateBody,
	authenticate,
	upload,
	isEmptyBody,
} from "../../middlewares/index.js";
import {
	userSingUpSchema,
	userSingInSchema,
	userUpdateSchema,
} from "../../models/index.js";

const router = express.Router();

router.post(
	"/signup",
	isEmptyBody,
	validateBody(userSingUpSchema),
	authController.signUp
);

router.post(
	"/signin",
	isEmptyBody,
	validateBody(userSingInSchema),
	authController.signIn
);

router.get("/current", authenticate, authController.getCurrentUser);

router.post("/signout", authenticate, authController.signOut);

router.patch(
	"/update",
	authenticate,
	validateBody(userUpdateSchema),
	upload.single("avatar"),
	authController.updateUserData
);

export { router };
