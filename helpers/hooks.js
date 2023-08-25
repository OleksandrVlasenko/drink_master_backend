export const handleSaveError = (error, _, next) => {
	error.status = error.code === 11000 ? 409 : 400;
	next();
};

export const handleUpdateValidator = (next) => {
	this.options.runValidators = true;
	next();
};

export default { handleSaveError, handleUpdateValidator };
