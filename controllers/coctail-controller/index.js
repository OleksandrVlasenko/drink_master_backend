import { getAll } from "./getAll.js";
import { getById } from "./getById.js";
import { getByFilter } from "./getByFilter.js";
import { getCategoryList } from "./getCategoryList.js";

import { ctrlWrapper } from "../../helpers/index.js";

const coctailController = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	getCategoryList: ctrlWrapper(getCategoryList),
	getByFilter: ctrlWrapper(getByFilter),
};

export { coctailController };
