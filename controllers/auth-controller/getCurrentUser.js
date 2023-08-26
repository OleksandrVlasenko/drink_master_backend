const getCurrentUser = (req, res) => {
	res.json({
		userData: { ...req.user._doc },
	});
};
export { getCurrentUser };
