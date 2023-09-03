const jsonParse = (req, res, next) => {
	const instructions = req.body.instructions;
	const ingredients = req.body.ingredients;

	instructions &&
		(req.body.instructions = JSON.parse(instructions.replace(/'/g, '"')));
	ingredients && (req.body.ingredients = JSON.parse(ingredients));

	next();
};

export { jsonParse };
