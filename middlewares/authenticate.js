import jwt from "jsonwebtoken";

import { HttpError } from "../helpers/index.js";
import { User } from "../models/user.js";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
	const { authorization } = req.headers;

	try {
		if (!authorization) throw HttpError(401);

		const [bearer, token] = authorization.split(" ");
		if (bearer !== "Bearer") throw HttpError(401);

		const { id } = jwt.decode(token, SECRET_KEY);
		const user = await User.findById(id);

		if (user) {
			if (user.authorizationTokens && user.authorizationTokens.length > 0) {
				const currentTime = Math.floor(Date.now() / 1000);

				user.authorizationTokens.forEach(async (obj) => {
					if (obj.exp < currentTime) {
						await User.findByIdAndUpdate(id, {
							$pull: { authorizationTokens: { token } },
						});
					}
				});
			}
		}

		jwt.verify(token, SECRET_KEY);

		if (user.authorizationTokens.length < 1) throw HttpError(401);

		const actualToken = user.authorizationTokens.find(
			(obj) => obj.token === token
		);

		if (!actualToken) throw HttpError(401);

		if (!user || !actualToken.token || actualToken.token !== token)
			throw HttpError(401);

		req.user = user;
		next();
	} catch (error) {
		next(HttpError(401, error.message));
	}
};

export { authenticate };
