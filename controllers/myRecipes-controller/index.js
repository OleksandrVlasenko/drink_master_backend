import { add } from "./add.js";
import { removeById } from "./removeById.js";
import { getAll } from "./getAll.js";

import { ctrlWrapper } from "../../helpers/index.js";

const myRecipesController = {
	add: ctrlWrapper(add),
	removeById: ctrlWrapper(removeById),
	getAll: ctrlWrapper(getAll),
};

export { myRecipesController };
