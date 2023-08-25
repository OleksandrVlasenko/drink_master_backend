import { getCurrentUser } from "./getCurrentUser.js";
import { signIn } from "./signIn.js";
import { logout } from "./logout.js";
import { signUp } from "./signUp.js";
import { verify } from "./verify.js";
import { updateUser } from "./updateUser.js";

import { ctrlWrapper } from "../../helpers/index.js";

const authController = {
	getCurrentUser: ctrlWrapper(getCurrentUser),
	signIn: ctrlWrapper(signIn),
	logout: ctrlWrapper(logout),
	signUp: ctrlWrapper(signUp),
	verify: ctrlWrapper(verify),
	updateUser: ctrlWrapper(updateUser),
};

export { authController };
