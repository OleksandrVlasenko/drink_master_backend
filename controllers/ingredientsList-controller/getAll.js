import { Ingredient } from "../../models/ingredient.js";

const getAll = async (req, res) => {
	const data = await Ingredient.find();
	res.json(data);
};

export { getAll };
