import { getAll } from "./getAll.js";

import { ctrlWrapper } from "../../helpers/index.js";

const ingredientsListController = {
	getAll: ctrlWrapper(getAll),
};

export { ingredientsListController };
