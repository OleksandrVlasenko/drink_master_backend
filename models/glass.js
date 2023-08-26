import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/index.js";

const glassSchema = Schema({ name: String }, { versionKey: false });

glassSchema.post("save", handleMongooseError);

const Glass = model("glass", glassSchema);

export { Glass };
