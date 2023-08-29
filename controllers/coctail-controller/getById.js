import { HttpError } from "../../helpers/index.js";
import { Coctail } from "../../models/coctail.js";

async function getById(req, res) {
	const { _id: userId } = req.user;
	const { id: coctailId } = req.params;
	const result = await Coctail.findById(
		coctailId,
		"drink description category glass instructions drinkThumb ingredients",
	);

	if (!result) {
		throw HttpError(400, `Coctail not found`);
	}

	const {
		_id,
		drink,
		description,
		category,
		glass,
		instructions,
		drinkThumb,
		ingredients,
		users,
	} = result;

	let isFavorite = false;

	if (users) {
		isFavorite = users.includes(userId);
	}

	res.json({
		_id,
		drink,
		description,
		category,
		glass,
		instructions,
		drinkThumb,
		ingredients,
		isFavorite,
	});
}

export { getById };
