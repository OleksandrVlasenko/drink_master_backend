import { Coctail } from "../../models/coctail.js";
import { responseItems } from "../../constants/controllers-constants.js";

const getAll = async (req, res) => {
	const { _id: owner } = req.user;

	const { page = 1, limit = 10 } = req.query;
	const skip = (page - 1) * limit;

	const totalRecipes = await Coctail.countDocuments({ owner });
	const totalPages = Math.ceil(totalRecipes / limit);

	const results = await Coctail.find({ owner })
		.select(responseItems)
		.skip(skip)
		.limit(limit);

	res.json({
		totalRecipes,
		totalPages,
		currentPage: page,
		results,
	});
};

export { getAll };
