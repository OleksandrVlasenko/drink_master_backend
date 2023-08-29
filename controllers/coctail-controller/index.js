import { getAll } from "./getAll.js";
import { getById } from "./getById.js";
import {getMainPage} from "./getMainPage.js"

import { ctrlWrapper } from "../../helpers/index.js";

const coctailController = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	getMainPage: ctrlWrapper(getMainPage),
};

export { coctailController };
