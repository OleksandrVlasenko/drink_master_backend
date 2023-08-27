async function getByFilter(req, res) {
  const { search, categories, ingredients } = req.query;
  
}

export { getByFilter };

// const { ctrlWrapper } = require("../../utils");
// const { Contact } = require("../../models/contact");

// async function getAll(req, res) {
// 	const { _id: owner } = req.user;
// 	const { page = 1, limit = 10, favorite } = req.query;
// 	const skip = (page - 1) * limit;
// 	const filter = favorite ? { owner, favorite } : { owner };

// 	const result = await Contact.find(filter, "", {
// 		skip,
// 		limit,
// 	}).populate("owner", "name email");

// 	res.json(result);
// }