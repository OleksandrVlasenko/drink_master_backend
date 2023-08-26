// import Joi from "joi";
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
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			// required: [true, "Verify token is required"],
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleMongooseError);

userSchema.post("findOneAndUpdate", handleMongooseError);

export const User = model("user", userSchema);
export default User;

// userSchema.post("save", handleMongooseError);

// const User = model("user", userSchema);

// const registerSchemaJoi = Joi.object({
// 	name: Joi.string().required(),
// 	email: Joi.string().pattern(emailRegexp).required(),
// 	password: Joi.string().min(6).required(),
// });

// const loginSchemaJoi = Joi.object({
// 	email: Joi.string().pattern(emailRegexp).required(),
// 	password: Joi.string().min(6).required(),
// });

// const updateSubscription = Joi.object({
// 	subscription: Joi.string()
// 		.valid(...enumSubscription)
// 		.required(),
// });

// const emailSchemaJoi = Joi.object({
// 	email: Joi.string().pattern(emailRegexp).required(),
// });

// const schemas = {
// 	registerSchemaJoi,
// 	loginSchemaJoi,
// };

// const schemas = {
// 	registerSchemaJoi,
// 	loginSchemaJoi,
// 	updateSubscription,
// 	emailSchemaJoi,
// };

// export { User, schemas };
