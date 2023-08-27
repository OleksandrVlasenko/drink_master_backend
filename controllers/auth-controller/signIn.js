import { User } from "../../models/user.js";
import { HttpError } from "../../helpers/index.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export const signIn = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) throw HttpError(401, "Email or password invalid");

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) throw HttpError(401, "Email or password invalid");

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, { token });
	res.json({
		token,
		user: {
			name: user.name,
			email: user.email,
		},
	});
};

export default { signIn };
