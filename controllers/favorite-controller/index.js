import { changeFavorite } from "./changeFavorite.js";
import { getAll } from "./getAll.js";

import { ctrlWrapper } from "../../helpers/index.js";

const favoriteController = {
	changeFavorite: ctrlWrapper(changeFavorite),
	getAll: ctrlWrapper(getAll),
};

export { favoriteController };
