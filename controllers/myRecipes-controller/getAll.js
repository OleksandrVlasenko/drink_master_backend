import { Cocktail } from "../../models/cocktail.js";
import { responseItems } from "../../constants/controllers-constants.js";
import { HttpError } from "../../helpers/index.js";

const getAll = async (req, res) => {
	const { _id: owner } = req.user;

	const { page = 1, limit = 10 } = req.query;
	const skip = (page - 1) * limit;

	const totalRecipes = await Cocktail.countDocuments({ owner });
	const totalPages = Math.ceil(totalRecipes / limit);

	const recipes = await Cocktail.find({ owner })
		.select(responseItems)
		.skip(skip)
		.limit(limit);

	if (page > totalPages) {
		throw HttpError(404, "Invalid page number");
	}

	res.json({
		totalPages,
		currentPage: page,
		totalRecipes,
		recipes,
	});
};

export { getAll };
