import { HttpError } from "../../helpers/index.js";
import { Cocktail, User } from "../../models/index.js";
import { showModal } from "../../utils/index.js";

async function changeFavorite(req, res) {
	const { _id: userId } = req.user;
	const { id: cocktailId } = req.params;

	const result = await Cocktail.findById(cocktailId, "users");

	if (!result) throw HttpError(400, `Cocktail not found`);

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
		req.user = await User.findByIdAndUpdate(
			userId,
			{
				$inc: { "showModal.favorite.counter": -1 },
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
		req.user = await User.findByIdAndUpdate(
			userId,
			{
				$inc: { "showModal.favorite.counter": 1 },
			},
			{ new: true },
		);
	}

	// const { showModalFirstRecipe, showModalTenthRecipe } = await showModal(
	// 	req.user,
	// 	"favorite",
	// );

	res.status(201).json({
		isFavorite: !isFavorite,
		showModalFavorite: { showModalFirstRecipe, showModalTenthRecipe },
	});
}

export { changeFavorite };
