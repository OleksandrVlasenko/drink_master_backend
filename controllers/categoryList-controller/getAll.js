import { Category } from "../../models/category.js";

const getAll = async (req, res) => {
	const result = await Category.find();
	res.json(result);
};

export { getAll };
