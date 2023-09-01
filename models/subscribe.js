import Joi from "joi";
import { handleMongooseError } from "../helpers/index.js";
import { model, Schema } from "mongoose";
import { emailRegexp } from "../constants/user-constants.js";

const subscribeSchema = new Schema(
    {
        email: {
			type: String,
			match: emailRegexp,
			unique: true,
			required: [true, "Email is required"],
		}
    },{ versionKey: false }
)

subscribeSchema.post("save", handleMongooseError);

const Subscriber = model("subscribe", subscribeSchema);

const subscriberSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})

export { Subscriber, subscriberSchema };