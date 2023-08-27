async function getAll(req, res) {
	console.log("aaa");
	const { _id: userId } = req.user;
	console.log("changeFavorite  userId:", userId);
	res.json({ message: "ok", userId });
}
export { getAll };
