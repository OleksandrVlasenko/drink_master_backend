import { Coctail } from "../../models/coctail.js";
import { HttpError } from "../../helpers/HttpError.js";

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Coctail.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(400, "Not found");
  }
  res.status(201).json({ message: "Delete success" });
};

export { removeById };
