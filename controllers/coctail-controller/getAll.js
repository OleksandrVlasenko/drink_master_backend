import { Coctail } from "../../models/coctail.js";

async function getAll(req, res) {
	const { page = 1, limit = 10 } = req.query;
	const skip = (page - 1) * limit;

	const result = await Coctail.find({}, "", {
		skip,
		limit,
	});
	
	res.json(result);
}

// async function aaa() {
// 	const 
// }

export { getAll };
