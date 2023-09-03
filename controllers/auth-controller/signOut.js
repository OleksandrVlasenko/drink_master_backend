import { User } from "../../models/user.js";

const signOut = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.json({
		message: "Signout succes",
	});
};

export { signOut };
