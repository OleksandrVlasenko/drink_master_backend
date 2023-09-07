import { Cocktail, User } from "../models/index.js";

async function updateFavorite(cocktailId, userId, isFavorite) {
	if (isFavorite) {
		await Cocktail.findByIdAndUpdate(
			cocktailId,
			{
				$pull: { users: userId },
				$inc: { userArrayLenght: -1 },
			},
			{ new: true },
		);
		const user = await User.findByIdAndUpdate(
			userId,
			{
				$inc: { "showModal.favorite.counter": -1 },
			},
			{ new: true },
		);

		return user;
	} else {
		await Cocktail.findByIdAndUpdate(
			cocktailId,
			{
				$push: { users: userId },
				$inc: { userArrayLenght: 1 },
			},
			{ new: true },
		);
		const user = await User.findByIdAndUpdate(
			userId,
			{
				$inc: { "showModal.favorite.counter": 1 },
			},
			{ new: true },
		);

		return user;
	}
}

export { updateFavorite };
