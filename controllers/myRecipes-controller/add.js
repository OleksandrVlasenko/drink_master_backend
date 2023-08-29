import { Coctail } from "../../models/coctail.js";
import { HttpError } from "../../helpers/HttpError.js";

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const { drink } = req.body;
  const existingRecipe = await Coctail.findOne({ drink });

  if (existingRecipe) {
    throw HttpError(409, `${drink} already exists`);
  }

  const result = await Coctail.create({ ...req.body, owner });
  res.status(201).json(result);
};

export { add };
