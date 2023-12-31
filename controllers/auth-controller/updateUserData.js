import { cloudinary } from "../../helpers/index.js";
import { User } from "../../models/index.js";
import fs from "fs/promises";
import { removeFileFromCloudinary } from "../../utils/index.js";

const updateUserData = async (req, res) => {
	const { _id, name: oldUserName, avatarURL: oldAvatarURL } = req.user;
	const { name } = req.body;

	const updateName = name || oldUserName;
	let updateAvatarURL = oldAvatarURL;

	if (req.file) {
		const { path: pathToAvatar } = req.file;
		await removeFileFromCloudinary(oldAvatarURL)
		const { url: updateAvatar } = await cloudinary.uploader.upload(
			pathToAvatar,
			{
				folder: "avatars",
			}
		);
		fs.unlink(pathToAvatar);
		updateAvatarURL = updateAvatar;
	}

	await User.findByIdAndUpdate(_id, {
		avatarURL: updateAvatarURL,
		name: updateName,
	});

	res.status(201).json({
		user: {
			name: updateName,
			avatarURL: updateAvatarURL,
		},
	});
};

export { updateUserData };
