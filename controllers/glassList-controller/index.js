import { getGlassList } from "./getGlassList.js";

import { ctrlWrapper } from "../../helpers/index.js";

const glassListController = {
	getGlassList: ctrlWrapper(getGlassList),
};

export { glassListController };