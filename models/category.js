import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const categorySchema = Schema({ name: String }, { versionKey: false });

categorySchema.post("save", handleMongooseError);

const Category = model("category", categorySchema);

export { Category };
