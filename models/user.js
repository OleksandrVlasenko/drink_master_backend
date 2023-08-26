import Joi from "joi";
import { Schema, model } from "mongoose";
import { emailRegexp } from "../constants/user-constants.js";

import { handleUpdateValidate, handleMongooseError } from "../helpers/index.js";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		email: {
			type: String,
			match: emailRegexp,
			unique: true,
			required: [true, "Email is required"],
		},
		password: {
			type: String,
			minlength: 6,
			required: [true, "Set password for user"],
		},
		token: {
			type: String,
			default: "",
		},
		avatarURL: {
			type: String,
			default: "",
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleMongooseError);

userSchema.post("findOneAndUpdate", handleMongooseError);

const User = model("user", userSchema);

const userSingUpSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const userSingInSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const userEmailVerifySchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
}).messages({
	"any.required": "missing required field email",
});

export { User, userSingUpSchema, userSingInSchema, userEmailVerifySchema };
