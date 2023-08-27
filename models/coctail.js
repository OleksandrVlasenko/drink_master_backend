import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const coctailSchema = Schema(
	{
		drink: { type: String, required: [true, "Set name of Coctail"] },
		description: { type: String, default: "" },
		category: { type: String, required: true },
		glass: { type: String, required: true },
		instructions: { type: String, default: "" },
		drinkThumb: { type: String, required: false, default: "" },
		ingredients: [
			{
				title: { type: String, required: true },
				ingredientThumb: { type: String, default: "" },
				measure: { type: String, required: true },
			},
		],
		users: { type: Array, default: [] },
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ versionKey: false },
);

coctailSchema.post("save", handleMongooseError);

const Coctail = model("coctail", coctailSchema);

const coctailSchemaJoi = Joi.object();

const schemas = { coctailSchemaJoi };

export { Coctail, schemas };
