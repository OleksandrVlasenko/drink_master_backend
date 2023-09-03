import { Cocktail } from "../../models/cocktail.js";
import { HttpError } from "../../helpers/HttpError.js";

const add = async (req, res) => {
	const { _id: owner } = req.user;

	const { drink } = req.body;
	const existingRecipe = await Cocktail.findOne({ drink });

	if (existingRecipe) {
		throw HttpError(409, `${drink} already exists`);
	}

	const recipe = await Cocktail.create({ ...req.body, owner });

	res.status(201).json({ message: "Recipe added successfully", recipe });
};

export { add };
