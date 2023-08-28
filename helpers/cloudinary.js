import cloud from "cloudinary";

const cloudinary = cloud.v2;

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_APY_KEY, CLOUDINARY_APY_SECRET } =
	process.env;

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_APY_KEY,
	api_secret: CLOUDINARY_APY_SECRET,
});

export { cloudinary };
