import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const coctailSchema = Schema(
	{	},
	{ versionKey: false },
);

coctailSchema.post("save", handleMongooseError);

const Coctail = model("coctail", coctailSchema);

const coctailSchemaJoi = Joi.object();

const schemas = { coctailSchemaJoi };

export { Coctail, schemas };
