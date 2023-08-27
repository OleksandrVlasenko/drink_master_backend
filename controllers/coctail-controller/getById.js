import { HttpError } from "../../helpers/index.js";
import { Coctail } from "../../models/coctail.js";

async function getById(req, res) {
	const { _id: userId } = req.user;
	const { id: coctailId } = req.params;
	const {
		_id,
		drink,
		description,
		category,
		glass,
		instructions,
		drinkThumb,
		ingredients,
	} = await Coctail.findById(coctailId);

	if (!_id) {
		throw HttpError(400, `Coctail not found`);
	}

	const { users } = await Coctail.findById(coctailId, "users");
	const isFavorite = users.includes(userId);

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
