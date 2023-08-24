import { addById } from "./addById.js";
import { getAll } from "./getAll.js";
import { removeById } from "./removeById.js";

import { ctrlWrapper } from "../../helpers/index.js";

const favoriteController = {
	addById: ctrlWrapper(addById),
	getAll: ctrlWrapper(getAll),
	removeById: ctrlWrapper(removeById),
};

export { favoriteController };
