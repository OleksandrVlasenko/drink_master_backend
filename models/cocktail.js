import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";
import { ingredientSchema } from "../models/ingredient.js";

const cocktailSchema = Schema(
	{
		drink: {
			type: String,
			required: [true, "Set name of Cocktail"],
			unique: [true, "Recipe with this name is already exists"],
		},
		description: { type: String, default: "" },
		category: { type: String, required: true },
		glass: { type: String, required: true },
		instructions: [{ type: String, default: "" }],
		drinkThumb: { type: String, required: false, default: "" },
		ingredients: [ingredientSchema],
		users: { type: Array, default: [] },
		userArrayLenght: { type: Number, default: 0 },
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ versionKey: false },
);

cocktailSchema.post("save", handleMongooseError);

const userRecipeAddSchemaJoi = Joi.object({
	drink: Joi.string().required(),
	description: Joi.string(),
	category: Joi.string().required(),
	glass: Joi.string().required(),
	instructions: Joi.array().items(Joi.string()),
	ingredients: Joi.array()
		.items(
			Joi.object({
				title: Joi.string().required(),
				measure: Joi.string().required(),
			}),
		)
		.required(),
	imageOfRecipe: Joi.string().allow("").optional(),
});

const Cocktail = model("cocktail", cocktailSchema);

export { Cocktail, userRecipeAddSchemaJoi };
