const handleUpdateValidate = (next) => {
  this.options.runValidators = true;
  next();
};

export {  handleUpdateValidate };