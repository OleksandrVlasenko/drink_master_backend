import { HttpError, cloudinary } from "../../helpers/index.js";
import { User } from "../../models/user.js";
import fs from "fs/promises";

const updateUserAvatar = async (req, res) => {
	if (!req.file) throw HttpError(400, "Please, add your avatar file");
	const { _id } = req.user;
	const { path: pathToAvatar } = req.file;
	const { url: updateAvatarURL } = await cloudinary.uploader.upload(
		pathToAvatar,
		{
			folder: "avatars",
		}
	);

	const { avatarURL } = await User.findByIdAndUpdate(_id, {
		avatarURL: updateAvatarURL,
	});

	fs.unlink(pathToAvatar);

	res.status(200).json({
		user: {
			avatarURL,
		},
	});
};

export { updateUserAvatar };