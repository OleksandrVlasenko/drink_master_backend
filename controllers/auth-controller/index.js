import { getCurrentUser } from "./getCurrentUser.js";
import { login } from "./login.js";
import { logout } from "./logout.js";
import { register } from "./register.js";
import { updateUser } from "./updateUser.js";

import { ctrlWrapper } from "../../helpers/index.js";

const authController = {
	getCurrentUser: ctrlWrapper(getCurrentUser),
	login: ctrlWrapper(login),
	logout: ctrlWrapper(logout),
	register: ctrlWrapper(register),
	updateUser: ctrlWrapper(updateUser),
};

export { authController };
