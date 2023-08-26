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
		ingredients: {}
	},
	{ versionKey: false },
);

coctailSchema.post("save", handleMongooseError);

const Coctail = model("coctail", coctailSchema);

const coctailSchemaJoi = Joi.object();

const schemas = { coctailSchemaJoi };

export { Coctail, schemas };

// {
//   "_id": {
//     "$oid": "639b6de9ff77d221f190c508"
//   },
//   "drink": "Irish Coffee",
//   "drinkAlternate": null,
//   "tags": "IBA,ContemporaryClassic",
//   "video": null,
//   "category": "Coffee / Tea",
//   "IBA": "Contemporary Classics",
//   "alcoholic": "Alcoholic",
//   "glass": "Irish coffee cup",
//   "instructions": "Heat the coffee, whiskey and sugar; do not boil. Pour into glass and top with cream; serve hot.",
//   "instructionsES": "Calienta el café, el whisky y el azúcar; no hierva. Vierta en un vaso y cubra con crema; servir caliente.",
//   "instructionsDE": "Kaffee, Whiskey und Zucker erhitzen; nicht kochen lassen. In ein Glas geben und mit Sahne übergießen; heiß servieren.",
//   "instructionsFR": "Faire chauffer le café, le whisky et le sucre ; ne pas faire bouillir. Verser dans un verre et garnir de crème; Servir chaud.",
//   "instructionsIT": "Riscaldare il caffè, il whisky e lo zucchero; non bollire. Versare nel bicchiere e ricoprire con la panna; servito caldo.",
//   "instructionsRU": "Нагрейте кофе, виски и сахар; не кипятить. Перелейте в стакан и украсьте сливками; подавать горячим.",
//   "instructionsPL": "Podgrzej kawę, whisky i cukier; nie gotuj. Wlać do szklanki i posypać śmietaną; podawać na gorąco.",
//   "instructionsUK": "Розігріти каву, віскі і цукор; не кип'ятити. Перелити в келих і зверху полити кремом; подавати гарячим.",
//   "drinkThumb": "http://res.cloudinary.com/dec1shvoo/image/upload/v1689167155/cocktails-v1/drinks/Irish_Coffee.jpg",
//   "ingredients": [
//     {
//       "title": "Irish whiskey",
//       "measure": "1 1/2 oz ",
//       "ingredientThumb": "http://res.cloudinary.com/dec1shvoo/image/upload/v1689169605/cocktails-v1/ingredient/Irish%20whiskey.png",
//       "thumb-medium": "http://res.cloudinary.com/dec1shvoo/image/upload/v1689169605/cocktails-v1/ingredient/Irish%20whiskey-Medium.png",
//       "thumb-small": "http://res.cloudinary.com/dec1shvoo/image/upload/v1689169605/cocktails-v1/ingredient/Irish%20whiskey-Small.png"
//     },
//     {
//       "title": "Coffee",
//       "measure": "8 oz ",
//       "ingredientThumb": "http://res.cloudinary.com/dec1shvoo/image/upload/v1689169605/cocktails-v1/ingredient/Coffee.png",
//       "thumb-medium": "http://res.cloudinary.com/dec1shvoo/image/upload/v1689169605/cocktails-v1/ingredient/Coffee-Medium.png",
//       "thumb-small": "http://res.cloudinary.com/dec1shvoo/image/upload/v1689169605/cocktails-v1/ingredient/Coffee-Small.png"
//     },
//     {
//       "title": "Sugar",
//       "measure": "1 tsp ",
//       "ingredientThumb": "http://res.cloudinary.com/dec1shvoo/image/upload/v1689169611/cocktails-v1/ingredient/Sugar.png",
//       "thumb-medium": "http://res.cloudinary.com/dec1shvoo/image/upload/v1689169611/cocktails-v1/ingredient/Sugar-Medium.png",
//       "thumb-small": "http://res.cloudinary.com/dec1shvoo/image/upload/v1689169611/cocktails-v1/ingredient/Sugar-Small.png"
//     },
//     {
//       "title": "Whipped cream",
//       "measure": "1 tblsp "
//     }
//   ]
// }
