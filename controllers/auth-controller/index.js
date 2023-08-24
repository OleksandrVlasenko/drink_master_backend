import { getCurrentUser } from "./getCurrentUser.js";
import { singIn } from "./singIn.js";
import { logout } from "./logout.js";
import { singUp } from "./singUp.js";
import { updateUser } from "./updateUser.js";

import { ctrlWrapper } from "../../helpers/index.js";

const authController = {
  getCurrentUser: ctrlWrapper(getCurrentUser),
  singIn: ctrlWrapper(singIn),
  logout: ctrlWrapper(logout),
  singUp: ctrlWrapper(singUp),
  updateUser: ctrlWrapper(updateUser),
};

export { authController };
