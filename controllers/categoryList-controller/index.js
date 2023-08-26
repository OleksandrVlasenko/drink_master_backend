import { getAll } from "./getAll.js";

import { ctrlWrapper } from "../../helpers/index.js";

const categoryListController = {
	getAll: ctrlWrapper(getAll),
};

export { categoryListController };
