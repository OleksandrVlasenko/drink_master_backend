import { Coctail } from "../../models/coctail.js";

async function getAll(req, res) {
	const { page = 1, limit = 10, search, category, ingredient } = req.query;
	const skip = (page - 1) * limit;

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

	const result = await Coctail.find(
		filter,
		"drink description category glass instructions drinkThumb ingredients",
		{
			skip,
			limit,
		},
	);
	console.log("getAll  result:", result)

	res.json(result);
}

export { getAll };
