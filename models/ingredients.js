import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, handleUpdateValidate } from "./hooks"

const ingredientSchema = new Schema(
    {},
    { versionKey: false, timestamps: true }
);

ingredientSchema.pre("findByIdAndUpdate", handleUpdateValidate);

ingredientSchema.post("save", handleSaveError);

ingredientSchema.post("findByIdAndUpdate", handleSaveError);

const emptySchema = Joi.object()
    .min(1)
    .messages({ "object.min": "Missing fields" });

const isValidId = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": "missing field favorite",
        "boolean.base": "Must be boolean type",
    }),
});

const ingredientSchemaJoi = Joi.object({});

const Ingredient = model("ingredient", ingredientSchema);

export default {
    Ingredient,
    emptySchema,
    ingredientSchemaJoi,
    isValidId,
};