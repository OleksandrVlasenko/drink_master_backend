import { Coctail } from "../../models/coctail.js";

async function getAll(req, res) {
	const { page = 1, limit = 10 } = req.query;
	console.log("getAll  limit:", limit);
	console.log("getAll  page:", page);
	const skip = (page - 1) * limit;
	const result = await Coctail.find({}, "", {
		skip,
		limit,
	}).populate("drink category");
	console.log("getAll  result:", result);
	res.json(result);
}

export { getAll };
