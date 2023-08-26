import User from "../../models/user.js";
import { HttpError } from "../../helpers/index.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;
console.log(SECRET_KEY);

export const signIn = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	console.log(user);

	if (!user) throw HttpError(401, "Email or password invalid");

	const passwordCompare = await bcrypt.compare(password, user.password);
	console.log(passwordCompare);
	if (!passwordCompare) throw HttpError(401, "Email or password invalid");
	// if (!user.verify) throw HttpError(404, "User not found");

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	console.log(token);
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
