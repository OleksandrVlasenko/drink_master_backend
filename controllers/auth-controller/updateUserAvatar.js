import { cloudinary } from "../../helpers/index.js";
import { User } from "../../models/user.js";
import fs from "fs/promises";

const updateUserData = async (req, res) => {
	const { _id, name: oldUserName, avatarURL: oldAvatarURL } = req.user;
	const { name } = req.body;
	console.log(_id);
	console.log(name);
	console.log(`Це буль: ${Boolean(name)}`);

	const updateName = name ? name : oldUserName;
	let updateAvatarURL = oldAvatarURL;

	if (req.file) {
		const { path: pathToAvatar } = req.file;
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

	const updateUser = await User.findById(_id);

	res.status(200).json({
		user: {
			name: updateUser.name,
			avatarURL: updateUser.avatarURL,
		},
	});
};

export { updateUserData };
