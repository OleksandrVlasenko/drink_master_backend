import { Cocktail } from "../../models/index.js";
import { responseItems } from "../../constants/controllers-constants.js";

async function getPopularRecipes(req, res) {
	const result = await Cocktail.find(
		{
			userArrayLenght: { $gte: 1 },
		},
		responseItems,
	)
		.sort({ userArrayLenght: -1 })
		.limit(5);

	res.json(result);
}

export { getPopularRecipes };
