import User from "../../models/user.js";
import { HttpError } from "../../helpers/index.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const signIn = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) throw HttpError(401, "Email or password invalid");
	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) throw HttpError(401, "Email or password invalid");
	// if (!user.verify) throw HttpError(404, "User not found");

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, { token });
	res.json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
};

export default { signIn };
