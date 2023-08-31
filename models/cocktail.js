import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const cocktailSchema = Schema(
  {
    drink: {
      type: String,
      required: [true, "Set name of Cocktail"],
      unique: true,
    },
    description: { type: String, default: "" },
    category: { type: String, required: true },
    glass: { type: String, required: true },
    instructions: [{ type: String, default: "" }],
    drinkThumb: { type: String, required: false, default: "" },
    ingredients: [
      {
        title: { type: String, required: true },
        ingredientThumb: { type: String, default: "" },
        measure: { type: String, required: true },
      },
    ],
    users: { type: Array, default: [] },
    userArrayLenght: { type: Number, default: 0 },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

cocktailSchema.post("save", handleMongooseError);

const Cocktail = model("cocktail", cocktailSchema);

const cocktailSchemaJoi = Joi.object();

const schemas = { cocktailSchemaJoi };

export { Cocktail, schemas };
