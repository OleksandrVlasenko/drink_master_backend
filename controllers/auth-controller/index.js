import { getCurrentUser } from "./getCurrentUser.js";
import { signIn } from "./signIn.js";
import { signOut } from "./signOut.js";
import { signUp } from "./signUp.js";
import { updateUserData } from "./updateUserData.js";

import { ctrlWrapper } from "../../helpers/index.js";

const authController = {
	getCurrentUser: ctrlWrapper(getCurrentUser),
	signIn: ctrlWrapper(signIn),
	signOut: ctrlWrapper(signOut),
	signUp: ctrlWrapper(signUp),
	updateUserData: ctrlWrapper(updateUserData),
};

export { authController };
