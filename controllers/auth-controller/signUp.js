import { User } from "../../models/user.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import { HttpError } from "../../helpers/index.js";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

const { SECRET_KEY } = process.env;

export const signUp = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) throw HttpError(409, "Email already exists");

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);

	const newUser = await User.create({
		...req.body,
		avatarURL,
		password: hashPassword,
	});

	const payload = {
		id: newUser._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(newUser._id, { token });

	res.status(201).json({
		token,
		user: {
			name: newUser.name,
			email: newUser.email,
			avatarURL,
		},
	});
};

export default { signUp };
