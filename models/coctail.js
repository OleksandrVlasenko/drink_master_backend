import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const coctailSchema = Schema(
	{
		drink: { type: String, required: [true, "Set name of Coctail"] },
		category: { type: Schema.Types.ObjectId, ref: "category", required: true },
		glass: { type: Schema.Types.ObjectId, ref: "glass", required: true },
		instructions: { type: String, required: true },
		drinkThumb: { type: String, required: false, default: "" },
		ingredients: [
			{
				...{ type: Schema.Types.ObjectId, ref: "ingredient", required: true },
				measure: { type: String, required: true },
			},
		],
	},
	{ versionKey: false },
);

coctailSchema.post("save", handleMongooseError);

const Coctail = model("coctail", coctailSchema);

const coctailSchemaJoi = Joi.object();

const schemas = { coctailSchemaJoi };

export { Coctail, schemas };
