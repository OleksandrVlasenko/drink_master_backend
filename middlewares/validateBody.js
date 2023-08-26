import { HttpError } from "../helpers/index.js";

const validateBody = (schema) => {
	return (req, _, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			next(HttpError(400, error.message));
		}
		next();
	};
};

export { validateBody };
