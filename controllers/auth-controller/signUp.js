import { User } from "../../models/user.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import { HttpError } from "../../helpers/index.js"; // допиши тут sendEmail в {}
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export const signUp = async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	const user = await User.findOne({ email });
	if (user) throw HttpError(409, "Email already exists");

	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
	});

	const userId = await User.findOne({ email });

	const payload = {
		id: userId._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(userId._id, { token });

	res.status(201).json({
		token,
		user: {
			name: newUser.name,
			email: newUser.email,
		},
	});
};

export default { signUp };
