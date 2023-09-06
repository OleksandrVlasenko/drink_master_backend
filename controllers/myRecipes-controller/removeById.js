import { Cocktail, User} from "../../models/index.js";
import { HttpError } from "../../helpers/HttpError.js";

const removeById = async (req, res) => {
	const { _id: userId } = req.user;
	const { id } = req.params;
	const recipes = await Cocktail.findByIdAndRemove(id);
	console.log("removeById  recipes:", recipes)
	if (!recipes) {
		throw HttpError(400, "Not found");
	}

	await User.findByIdAndUpdate(
		userId,
		{
			$inc: { "showModal.myRecipes.counter": -1 },
		},
		{ new: true },
	);

	res.status(201).json({ message: "Delete success" });
};

export { removeById };
