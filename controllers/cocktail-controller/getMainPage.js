import { Cocktail } from "../../models/index.js";
import { getArrayWithThreeItems } from "../../utils/index.js";

async function getMainPage(req, res) {
	const result = await Cocktail.aggregate([
		{
			$group: {
				_id: "$category",
				items: { $push: "$$ROOT" },
			},
		},
		{
			$project: {
				_id: 0,
				category: "$_id",
				recipes: {
					$map: {
						input: "$items",
						in: {
							_id: "$$this._id",
							drink: "$$this.drink",
							description: "$$this.description",
							category: "$$this.category",
							glass: "$$this.glass",
							instructions: "$$this.instructions",
							drinkThumb: "$$this.drinkThumb",
							ingredients: "$$this.ingredients",
						},
					},
				},
			},
		},
	]);

	

	const recipes = result
		.map(({ category, recipes }) => {
			return { category, recipes: getArrayWithThreeItems(recipes) };
		})
		.reduce((acc, { recipes, category }) => {
			acc[category] = recipes;
			return acc;
		}, {});

	res.json(recipes);
}

export { getMainPage };
