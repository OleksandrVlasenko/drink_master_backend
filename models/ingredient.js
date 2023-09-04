import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers/index.js";

const ingredientSchema = new Schema(
	{
		title: { type: String, required: true },
		ingredientThumb: { type: String, default: "" },
		measure: { type: String, required: true },
	},
	{ versionKey: false, timestamps: false, _id: false },
);

ingredientSchema.post("save", handleMongooseError);

const Ingredient = model("ingredient", ingredientSchema);

export { Ingredient, ingredientSchema };
