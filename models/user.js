import Joi from "joi";
import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers/index.js";

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const enumSubscription = ["starter", "pro", "business"];

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
		subscription: {
			type: String,
			enum: enumSubscription,
			default: "starter",
		},
		token: { type: String, default: "" },
		verify: { type: Boolean, default: false },
		verificationCode: {
			type: String,
			require: [true, "Verify token is required"],
		},
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

const updateSubscription = Joi.object({
	subscription: Joi.string()
		.valid(...enumSubscription)
		.required(),
});

const emailSchemaJoi = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
	registerSchemaJoi,
	loginSchemaJoi,
	updateSubscription,
	emailSchemaJoi,
};

export { User, schemas };
