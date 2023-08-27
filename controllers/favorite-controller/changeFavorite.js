import { HttpError } from "../../helpers/index.js";
import { Coctail } from "../../models/coctail.js";

async function changeFavorite(req, res) {
	const { _id: userId } = req.user;
	const { id: coctailId } = req.params;

	const { users } = await Coctail.findById(coctailId, "users");

	if (!users) {
		throw HttpError(400, `Coctail not found`);
	}

	const isFavorite = users.includes(userId);

	if (isFavorite) {
		await Coctail.findByIdAndUpdate(
			coctailId,
			{
				$pull: { users: userId },
			},
			{ new: true },
		);
	} else {
		await Coctail.findByIdAndUpdate(
			coctailId,
			{ $push: { users: userId } },
			{ new: true },
		);
	}

	res.status(201).json({ isfavorite: !isFavorite });
}

export { changeFavorite };
