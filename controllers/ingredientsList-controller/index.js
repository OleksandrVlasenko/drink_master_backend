import { getIngredientsList } from "./getIngredientsList.js";

import { ctrlWrapper } from "../../helpers/index.js";

const ingredientsListController = {
	getIngredientsList: ctrlWrapper(getIngredientsList),
};

export { ingredientsListController };