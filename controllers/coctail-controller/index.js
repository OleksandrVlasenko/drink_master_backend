import { getAll } from "./getAll.js";
import { getById } from "./getById.js";

import { ctrlWrapper } from "../../helpers/index.js";

const coctailController = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
};

export { coctailController };
