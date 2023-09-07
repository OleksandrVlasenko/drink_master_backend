import { HttpError } from "../../helpers/index.js";
import { Cocktail } from "../../models/index.js";
import { showModal, updateFavorite } from "../../utils/index.js";

async function changeFavorite(req, res) {
	const { _id: userId } = req.user;
	const { id: cocktailId } = req.params;

	const result = await Cocktail.findById(cocktailId, "users");

	if (!result) throw HttpError(400, `Cocktail not found`);

	const { users } = result;
	const isFavorite = users.includes(userId);

	req.user = await updateFavorite(cocktailId, userId, isFavorite);

	const { showModalFirstRecipe, showModalTenthRecipe } = await showModal(
		req.user,
		"favorite",
	);

	res.status(201).json({
		isFavorite: !isFavorite,
		showModalFavorite: { showModalFirstRecipe, showModalTenthRecipe },
	});
}

export { changeFavorite };
