import { getAll } from "./getAll.js";

import { ctrlWrapper } from "../../helpers/index.js";

const glassListController = {
	getAll: ctrlWrapper(getAll),
};

export { glassListController };