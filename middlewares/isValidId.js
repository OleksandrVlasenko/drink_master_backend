import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
	const { contactId } = req.params;

	if (!isValidObjectId(contactId)) {
		next(HttpError(400, `${contactId} is not valid Id`));
	}
	next();
};

export { isValidId };
