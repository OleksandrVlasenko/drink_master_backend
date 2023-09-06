import { Ingredient } from "../../models/index.js";

const getAll = async (req, res) => {
	const data = await Ingredient.find();
	res.json(data);
};

export { getAll };
