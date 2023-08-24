import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const contactSchema = Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ versionKey: false },
);

contactSchema.post("save", handleMongooseError);

const Recipe = model("recipe", contactSchema);

const contactSchemaJoi = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

const updateFavoriteSchemaJoi = Joi.object({
	favorite: Joi.boolean().required(),
});

const schemas = { contactSchemaJoi, updateFavoriteSchemaJoi };

export { Recipe, schemas };
