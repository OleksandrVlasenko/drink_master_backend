import { extractPublicId } from "cloudinary-build-url";
import { cloudinary } from "../helpers/index.js";

async function removeFileFromCloudinary(url) {
	const publicId = extractPublicId(url);
	await cloudinary.uploader.destroy(publicId);
}

export { removeFileFromCloudinary };
