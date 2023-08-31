import { HttpError } from "../../helpers/index.js";
import { Cocktail } from "../../models/cocktail.js";

async function changeFavorite(req, res) {
	const { _id: userId } = req.user;
	const { id: cocktailId } = req.params;

	const result = await Cocktail.findById(cocktailId, "users");

	if (!result) {
		throw HttpError(400, `Cocktail not found`);
	}

	const { users } = result;
	const isFavorite = users.includes(userId);

	if (isFavorite) {
		await Cocktail.findByIdAndUpdate(
			cocktailId,
			{
				$pull: { users: userId },
				$inc: { userArrayLenght: -1 },
			},
			{ new: true },
		);
	} else {
		await Cocktail.findByIdAndUpdate(
			cocktailId,
			{
				$push: { users: userId },
				$inc: { userArrayLenght: 1 },
			},
			{ new: true },
		);
	}

	res.status(201).json({ isFavorite: !isFavorite });
}

export { changeFavorite };
