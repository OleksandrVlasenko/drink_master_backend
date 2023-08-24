import Joi from "joi";
import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers/index.js";

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const userSchema = Schema(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: [true, "Set password for user"],
			minlength: 6,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: emailRegexp,
		},
		
		token: { type: String, default: "" },
	},
	{ versionKey: false, timestamps: true },
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const registerSchemaJoi = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const loginSchemaJoi = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const schemas = {
	registerSchemaJoi,
	loginSchemaJoi,
};

export { User, schemas };
