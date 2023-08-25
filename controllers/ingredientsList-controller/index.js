import { getIngredientsList } from "./getIngredientsList.js";
import { getAll } from "./getAll.js";

import { ctrlWrapper } from "../../helpers/index.js";

const ingredientsListController = {
  getIngredientsList: ctrlWrapper(getIngredientsList),
  getAll: ctrlWrapper(getAll),
};

export { ingredientsListController };
