import { HttpError } from "../../helpers/index.js";
import { Coctail } from "../../models/coctail.js";

async function changeFavorite(req, res) {
	const { _id: userId } = req.user;
	const { id: coctailId } = req.params;

	const result = await Coctail.findById(coctailId, "users");

	if (!result) {
		throw HttpError(400, `Coctail not found`);
	}

	const { users } = result;
	const isFavorite = users.includes(userId);

	if (isFavorite) {
		await Coctail.findByIdAndUpdate(
			coctailId,
			{
				$pull: { users: userId },
				$inc: { userArrayLenght: -1 },
			},
			{ new: true },
		);
	} else {
		await Coctail.findByIdAndUpdate(
			coctailId,
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
