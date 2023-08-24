import { Coctail } from "../../models/coctail.js";

async function getAll(req, res) {
	const result = await Coctail.find();
	res.json(result);
}

export { getAll };
