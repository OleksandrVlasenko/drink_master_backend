import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleMongooseError, handleUpdateValidate } from "../helpers/index.js";

const ingredientSchema = new Schema(
	{
		title: { type: String, required: true },
		ingredientThumb: { type: String, default: "" },
	},
	{ versionKey: false, timestamps: true },
);

ingredientSchema.pre("findByIdAndUpdate", handleUpdateValidate);

ingredientSchema.post("save", handleMongooseError);

ingredientSchema.post("findByIdAndUpdate", handleMongooseError);

const emptySchema = Joi.object()
	.min(1)
	.messages({ "object.min": "Missing fields" });

const isValidId = Joi.object({
	favorite: Joi.boolean().required().messages({
		"any.required": "missing field favorite",
		"boolean.base": "Must be boolean type",
	}),
});

const ingredientSchemaJoi = Joi.object({});

const Ingredient = model("ingredient", ingredientSchema);

export {
	Ingredient,
	emptySchema,
	ingredientSchemaJoi,
	isValidId,
};
