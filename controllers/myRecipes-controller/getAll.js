import { Coctail } from "../../models/coctail.js";
// import { User } from "../models/user.js";
// import { HttpError } from "../../helpers/index.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  // const { page = 1, limit = 10 } = req.query;
  // const skip = (page - 1) * limit;

  const results = await Coctail.find({ owner });
  res.json(results);
};

export { getAll };
