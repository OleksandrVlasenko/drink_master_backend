import jwt from "jsonwebtoken";

import { HttpError } from "../helpers/index.js";
import { User } from "../models/index.js";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
	const { authorization } = req.headers;

	try {
		if (!authorization) throw HttpError(401);

		const [bearer, token] = authorization.split(" ");
		if (bearer !== "Bearer") throw HttpError(401);

		try {
			const { id } = jwt.verify(token, SECRET_KEY);
			req.id = id;
		} catch (error) {
			const { id } = jwt.decode(token, SECRET_KEY);
			await User.findByIdAndUpdate(id, {
				$pull: { authorizationTokens: { token } },
			});
			next(HttpError(401, error.message));
		}

		const { id } = req;
		const user = await User.findById(id);

		if (user.authorizationTokens.length === 0) throw HttpError(401);

		const actualToken = user.authorizationTokens.find(
			obj => obj.token === token,
		);

		if (!user || !actualToken)
			throw HttpError(401);

		req.user = user;
		next();
	} catch (error) {
		next(HttpError(401, error.message));
	}
};

export { authenticate };
