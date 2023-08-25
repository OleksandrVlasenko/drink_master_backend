import User from "../../models/user.js";
import { nanoid } from "nanoid";
import "dotenv/config";
import bcrypt from "bcrypt";
import { HttpError, sendEmail } from "../../helpers/index.js";
// import jwt from "jsonwebtoken";

const { BASE_URL } = process.env;

export const signUp = async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) throw HttpError(409, "Email already exists");

	const hashPassword = await bcrypt.hash(password, 10);
	const verificationToken = nanoid();

	const newUser = await User.create({
		...req.body,
		name,
		password: hashPassword,
		verificationToken,
	});

	const verifyEmail = {
		to: email,
		subject: "Drink Master: Verify email",
		html: `<div>
            <p>
              Please,
              <a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">
                CLICK
              </a>
              on this link to verify your email
            </p>
            <p style="color: orange"><strong>WARNING!!!</strong></p>
            <p>If you have not registered with our app, <br>please ignore this email and <span style="color: red">do not click on this link!</span></p>
          </div>`,
	};

	await sendEmail(verifyEmail);

	res.status(201).json({
		user: {
			name: newUser.name,
			email: newUser.email,
		},
	});
};

export default { signUp };
