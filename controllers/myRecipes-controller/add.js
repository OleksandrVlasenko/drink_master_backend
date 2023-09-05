import { cloudinary } from "../../helpers/index.js";
import { Cocktail } from "../../models/cocktail.js";
import { Category } from "../../models/category.js";
import { Glass } from "../../models/glass.js";
import { Ingredient } from "../../models/ingredient.js";
import { HttpError } from "../../helpers/HttpError.js";
import fs from "fs/promises";
import { showModal } from "../../utils/index.js";
import { User } from "../../models/user.js";

const add = async (req, res, next) => {
	const { _id: owner } = req.user;
	const { drink, category, glass, ingredients } = req.body;

	try {
		const incomingDrink = await Cocktail.findOne({ drink });
		if (incomingDrink) throw HttpError(409, `${drink} already exists`);

		const incomingCategoty = await Category.findOne({ name: category });
		if (!incomingCategoty)
			throw HttpError(400, "The category must be from a list of category");

		const incomingGlass = await Glass.findOne({ name: glass });
		if (!incomingGlass)
			throw HttpError(400, "The glass must be from a list of glass");

		const arrayOfIngredients = ingredients.reduce((acc, elem) => {
			acc.push(elem.title);
			return acc;
		}, []);

		const ingredientsOfDB = await Ingredient.find({
			title: { $in: arrayOfIngredients },
		});

		if (arrayOfIngredients.length !== ingredientsOfDB.length)
			throw HttpError(400, "The ingredien must be from a list of ingredients");

		req.body.ingredients = ingredients.map(elem => {
			elem.ingredientThumb = ingredientsOfDB.find(
				({ title }) => title === elem.title,
			).ingredientThumb;
			return elem;
		});

		let drinkThumb = "";

		if (req.file) {
			const { path } = req.file;

			const { url } = await cloudinary.uploader.upload(path, {
				folder: "imagesOfRecipes",
			});

			drinkThumb = url;
		}

		const { _id } = await Cocktail.create({ ...req.body, drinkThumb, owner });

		req.user = await User.findByIdAndUpdate(
			owner,
			{
				$inc: { "showModal.myRecipes.counter": 1 },
			},
			{ new: true },
		);

		const { showModalFirstRecipe, showModalTenthRecipe } = await showModal(
			req.user,
			"myRecipes",
		);

		res.status(201).json({
			_id,
			showModalMyRecipes: { showModalFirstRecipe, showModalTenthRecipe },
		});
	} catch (error) {
		next(error);
	} finally {
		fs.unlink(req.file.path);
	}
};

export { add };
