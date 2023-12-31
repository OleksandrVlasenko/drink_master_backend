import { User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

const signIn = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) throw HttpError(400, "Email or password invalid");

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) throw HttpError(400, "Email or password invalid");

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, {
		$push: { authorizationTokens: { token } },
	});

	const timeDifference = Date.now() - user.createdAt;
	const { isShown } = user.showModal.timeUsing;
	let showModalTimeUsing = false;
	if (timeDifference > 864000000 && !isShown) {
		showModalTimeUsing = true;
		await User.findByIdAndUpdate(user._id, {
			"showModal.timeUsing.isShown": true,
		});
	}

	res.json({
		token,
		user: {
			name: user.name,
			email: user.email,
			avatarURL: user.avatarURL,
		},
		showModalTimeUsing,
	});
};

export { signIn };
