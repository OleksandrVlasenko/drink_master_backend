import { Cocktail } from "../../models/cocktail.js";
import { HttpError } from "../../helpers/HttpError.js";

const removeById = async (req, res) => {
	const { id } = req.params;
	const recipes = await Cocktail.findByIdAndRemove(id);
	if (!recipes) {
		throw HttpError(400, "Not found");
	}
	res.status(201).json({ message: "Delete success" });
};

export { removeById };
