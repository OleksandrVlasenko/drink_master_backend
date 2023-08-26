const getCurrentUser = (req, res) => {
	// const { name, email, token } = req.user;
	console.log({ user: { ...req.user } });
};
export { getCurrentUser };
