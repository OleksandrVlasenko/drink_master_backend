import { HttpError } from "../../helpers/index.js";
import { Coctail } from "../../models/coctail.js";
import { responseItems } from "../../constants/controllers-constants.js";

async function getById(req, res) {
	const { _id: userId } = req.user;
	const { id: coctailId } = req.params;

	const result = await Coctail.findById(
		coctailId,
		`${responseItems} users`
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
