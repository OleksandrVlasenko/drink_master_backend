import express from "express";
import { authController } from "../../controllers/auth-controller/index.js";
import { validateBody, authenticate, upload } from "../../middlewares/index.js";
import { userSingUpSchema, userSingInSchema } from "../../models/user.js";

const router = express.Router();

router.post("/signup", validateBody(userSingUpSchema), authController.signUp);

router.post("/signin", validateBody(userSingInSchema), authController.signIn);

router.get("/current", authenticate, authController.getCurrentUser);

router.post("/signout", authenticate, authController.signOut);

router.patch("/avatars", authenticate, upload.single("avatar"));

export { router };
