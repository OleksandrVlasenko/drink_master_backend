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
				resipes: {
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
				resipes: {
					$map: {
						input: "$resipes",
						in: {
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

	const recipes = result.reduce((acc, { resipes, category }) => {
		acc[category] = resipes;
		return acc;
	}, {});

	res.json(recipes);
}

export { getMainPage };
