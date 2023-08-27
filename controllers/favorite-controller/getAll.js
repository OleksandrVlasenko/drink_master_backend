import { Coctail } from "../../models/coctail.js";
import { responseItems } from "../../constants/controllers-constants.js";

async function getAll(req, res) {
	const { _id: userId } = req.user;

	const result = await Coctail.find({ users: userId }, responseItems);

	res.json(result);
}
export { getAll };
