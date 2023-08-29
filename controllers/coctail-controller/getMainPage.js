import { Coctail } from "../../models/coctail.js";

async function getMainPage(req, res) {
	const result = await Coctail.aggregate([
		{
			$group: {
				_id: "$category",
				items: { $push: "$$ROOT" },
			},
		},
		{
			$addFields: {
				recipes: {
					$map: {
						input: {
							$range: [0, 3],
						},
						in: {
							$arrayElemAt: [
								"$items",
								{ $floor: { $multiply: [{ $rand: {} }, { $size: "$items" }] } },
							],
						},
					},
				},
			},
		},
		{
			$project: {
				_id: 0,
				category: "$_id",
				recipes: {
					$map: {
						input: "$recipes",
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

	const recipes = result.reduce((acc, { recipes, category }) => {
		acc[category] = recipes;
		return acc;
	}, {});

	res.json(recipes);
}

export { getMainPage };
