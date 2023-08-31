import { HttpError } from "../../helpers/index.js";
import { getRecipesByFilter } from "../../utils/index.js";

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

		const result = await getRecipesByFilter(filter, pageNumber, pageSize);

		if (result.length === 0) {
			result.push({});
		}

		const { recipes, totalRecipes, totalPages } = result[0];

		if (pageNumber > totalPages) {
			throw HttpError(400);
		}

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
