import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleMongooseError, handleUpdateValidate } from "../helpers/index.js";

const ingredientSchema = new Schema(
	{
		title: { type: String, required: true },
		ingredientThumb: { type: String, default: "" },
		measure: {type: String, required: true}
	},
	{ versionKey: false, timestamps: true },
);

ingredientSchema.post("save", handleMongooseError);

const Ingredient = model("ingredient", ingredientSchema);

export {
	Ingredient,
	ingredientSchema,
};
