const handleUpdateValidate = function (next) {
	this.options.runValidators = true;
	next();
};

export { handleUpdateValidate };
