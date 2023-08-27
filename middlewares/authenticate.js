import jwt from "jsonwebtoken";

import { HttpError } from "../helpers/index.js";
import { User } from "../models/user.js";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
	const { authorization } = req.headers;
	try {
		if (!authorization) {
			throw HttpError(401);
		}

		const [bearer, token] = authorization.split(" ");

		if (bearer !== "Bearer") {
			throw HttpError(401);
		}

		const { id } = jwt.verify(token, SECRET_KEY);

		const user = await User.findById(id);

		if (!user || !user.token || user.token !== token) {
			throw HttpError(401);
		}
		req.user = user;
		next();
	} catch (error) {
		next(HttpError(401, error.message));
	}
};

export { authenticate };
