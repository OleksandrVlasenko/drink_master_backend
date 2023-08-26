import { HttpError } from "../helpers/index.js";

export const isEmptyBody = (req, _, next) => {
	const { length } = Object.keys(req.body);
	if (!length) {
		next(HttpError(400, `The fields must be completed`));
	}
	next();
};

export default { isEmptyBody };
