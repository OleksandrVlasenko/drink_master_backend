import { Coctail } from "../../models/coctail.js";

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Coctail.create({ ...req.body, owner });
  res.status(201).json(result);
};

export { add };
