import { Cocktail } from "../models/index.js";

async function getRecipesByFilter(filterQuery, pageNumber, pageSize) {
	return await Cocktail.aggregate([
		{
			$match: {
				...filterQuery,
			},
		},

		{
			$facet: {
				recipes: [{ $skip: (pageNumber - 1) * pageSize }, { $limit: pageSize }],
				totalCount: [{ $group: { _id: null, count: { $sum: 1 } } }],
			},
		},

		{ $unwind: "$totalCount" },

		{
			$project: {
				_id: 0,
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
				totalRecipes: "$totalCount.count",
				totalPages: { $ceil: { $divide: ["$totalCount.count", pageSize] } },
			},
		},
	]);
}

export {getRecipesByFilter}