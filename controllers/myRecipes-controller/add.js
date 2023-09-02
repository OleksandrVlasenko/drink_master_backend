import { cloudinary } from "../../helpers/index.js";
import { Cocktail } from "../../models/cocktail.js";
import { Category } from "../../models/category.js";
import { Glass } from "../../models/glass.js";
import { HttpError } from "../../helpers/HttpError.js";
import fs from "fs/promises";

const add = async (req, res, next) => {
	const { _id: owner } = req.user;
	const { drink, category, glass } = req.body;
	try {
		const incomingDrink = await Cocktail.findOne({ drink });
		if (incomingDrink) {
			throw HttpError(409, `${drink} already exists`);
		}

		const incomingCategoty = await Category.findOne({ name: category });
		if (!incomingCategoty) {
			throw HttpError(400, "The category must be from a list of category");
		}

		const incomingGlass = await Glass.findOne({ name: glass });
		if (!incomingGlass) {
			throw HttpError(400, "The glass must be from a list of glass");
		}

		let drinkThumb = "";

		if (req.file) {
			const { path } = req.file;

			const { url } = await cloudinary.uploader.upload(path, {
				folder: "imagesOfRecipes",
			});

			drinkThumb = url;
		}

		await Cocktail.create({ ...req.body, drinkThumb, owner });

		res.status(201).json({ message: "Recipe added successfully" });
	} catch (error) {
		next(error);
	} finally {
		fs.unlink(req.file.path);
	}
};

export { add };
