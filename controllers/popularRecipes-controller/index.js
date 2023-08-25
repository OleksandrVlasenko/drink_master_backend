import { getPopularRecipes } from "./getPopularRecipes.js";

import { ctrlWrapper } from "../../helpers/index.js";

const popularRecipesController = {
	getPopularRecipes: ctrlWrapper(getPopularRecipes),
};

export { popularRecipesController };