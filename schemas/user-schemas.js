import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

export const userSingUpSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

export const userSingInSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

export const userEmailVerifySchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
}).messages({
	"any.required": "missing required field email",
});

export default {
	userSingUpSchema,
	userSingInSchema,
	userEmailVerifySchema,
};
