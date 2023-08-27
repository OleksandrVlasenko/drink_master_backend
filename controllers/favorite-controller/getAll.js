import { Coctail } from "../../models/coctail.js";
import { responseItems } from "../../constants/controllers-constants.js";

async function getAll(req, res) {
	const { _id: userId } = req.user;
	const { page = 1, limit = 10 } = req.query;
	const skip = (page - 1) * limit;

	const result = await Coctail.find({ users: userId }, responseItems, {
		skip,
		limit,
	});

	res.json(result);
}
export { getAll };
