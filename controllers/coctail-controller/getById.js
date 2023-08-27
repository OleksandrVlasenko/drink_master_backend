import { HttpError } from "../../helpers/index.js";
import { Coctail } from "../../models/coctail.js";
import { responseItems } from "../../constants/controllers-constants.js";

async function getById(req, res) {
    const { id } = req.params;
    const result = await Coctail.findById(id, responseItems);
    if (!result) {
        throw HttpError(400, `Coctail not found`);
    }
    res.json(result);
};

export { getById };
