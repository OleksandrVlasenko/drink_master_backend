import { Coctail } from "../../models/coctail.js";
import { HttpError } from "../../helpers/index.js";

async function getAll(req, res, next) {
	const { page, limit, search, category, ingredient } = req.query;

	const pageNumber = page ? Number(page) : 1;
	const pageSize = limit ? Number(limit) : 10;

	try {
		if (Number.isNaN(pageNumber) || Number.isNaN(pageSize)) {
			throw HttpError(400);
		}

		let filter = {};

		if (search) {
			filter = { ...filter, drink: { $regex: search, $options: "i" } };
		}

		if (category) {
			filter = { ...filter, category };
		}

		if (ingredient) {
			filter = { ...filter, "ingredients.title": ingredient };
		}

		const result = await Coctail.aggregate([
			{
				$match: {
					...filter,
				},
			},

			{
				$facet: {
					recipes: [
						{ $skip: (pageNumber - 1) * pageSize },
						{ $limit: pageSize },
					],
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

		if (result.length === 0) {
			result.push({});
		}

		const { recipes, totalRecipes, totalPages } = result[0];

		res.json({
			recipes: recipes ?? [],
			totalRecipes: totalRecipes ?? 0,
			totalPages: totalPages ?? 0,
			currentPage: pageNumber,
		});
	} catch (error) {
		next(error);
	}
}

export { getAll };
