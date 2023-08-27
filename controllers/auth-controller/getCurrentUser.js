const getCurrentUser = (req, res) => {
	const { name, email, avatarURL } = req.user;
	res.json({
		user: { name, email, avatarURL },
	});
};
export { getCurrentUser };
