import { Cocktail, User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";
import { removeFileFromCloudinary } from "../../utils/index.js";

const removeById = async (req, res, next) => {
	const { _id: userId } = req.user;
	const { id } = req.params;

	try {
		const recipes = await Cocktail.findOneAndDelete({
			$and: [{ _id: id }, { owner: userId }],
		});

		if (!recipes) {
			throw HttpError(
				400,
				"You do not have permission to delete this recipe or recipe not found",
			);
		}

		const { drinkThumb } = recipes;
		await removeFileFromCloudinary(drinkThumb);

		await User.findByIdAndUpdate(
			userId,
			{
				$inc: { "showModal.myRecipes.counter": -1 },
			},
			{ new: true },
		);

		res.status(201).json({ message: "Delete success" });
	} catch (error) {
		next(error);
	}
};

export { removeById };
