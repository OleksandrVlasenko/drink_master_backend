import { Category } from "../../models/index.js";

const getAll = async (req, res) => {
	const result = await Category.find();
	res.json(result);
};

export { getAll };
