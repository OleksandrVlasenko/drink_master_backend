import Joi from "joi";
import { Schema, model } from "mongoose";
import { emailRegexp } from "../constants/user-constants.js";

import { handleUpdateValidate, handleMongooseError } from "../helpers/index.js";

const userSchema = new Schema(
	{
		name: {
			type: String,
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
		authorizationTokens: {
			type: [
				{
					token: { type: String },
					exp: { type: String },
				},
			],
			default: [],
		},
		showModal: {
			timeUsing: { isShown: { type: Boolean, default: false } },
			favorite: {
				counter: { type: Number, default: 0 },
				isShownFirstRecipe: { type: Boolean, default: false },
				isShownTenthRecipe: { type: Boolean, default: false },
			},
			myRecipes: {
				counter: { type: Number, default: 0 },
				isShownFirstRecipe: { type: Boolean, default: false },
				isShownTenthRecipe: { type: Boolean, default: false },
			},
		},
		avatarURL: {
			type: String,
			required: true,
			default: "",
		},
	},
	{ versionKey: false, timestamps: true },
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

const userUpdateSchema = Joi.object({
	name: Joi.string(),
	avatar: Joi.string(),
});

export { User, userSingUpSchema, userSingInSchema, userUpdateSchema };
