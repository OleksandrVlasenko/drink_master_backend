import { Glass } from "../../models/index.js";

const getAll = async (req, res) => {
	const result = await Glass.find();
	res.json(result);
};

export { getAll };
