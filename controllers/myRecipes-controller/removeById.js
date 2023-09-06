import { Cocktail } from "../../models/cocktail.js";
import { HttpError } from "../../helpers/HttpError.js";

const removeById = async (req, res, next) => {
	const { id } = req.params;
	const { _id: user } = req.user;

	try {
		const deletedDrink = await Cocktail.findOneAndDelete({
			$and: [{ _id: id }, { owner: user }],
		});
		if (!deletedDrink) {
			throw HttpError(
				200,
				"You do not have permission to delete this recipe or recipe not found"
			);
		}
		console.log(deletedDrink);

		res.json({
			message: `${deletedDrink.drink} has been deleted`,
		});
	} catch (error) {
		next(error);
	}
};

export { removeById };
