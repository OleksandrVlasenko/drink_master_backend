import { HttpError } from "../../helpers/index.js";
import { Coctail } from "../../models/coctail.js";

async function getById(req, res) {
    const { id } = req.params;
    const result = await Coctail.findById(id);
    if (!result) {
        throw HttpError(404, `Coctail with id=${id} not found`);
    }
    res.json(result);
};

export { getById };
