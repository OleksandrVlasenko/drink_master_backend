import { getAll } from "./getAll";

import { ctrlWrapper } from "../../helpers/index.js";

const ingredientsListController = {
	getAll: ctrlWrapper(getAll),
};

export { ingredientsListController };