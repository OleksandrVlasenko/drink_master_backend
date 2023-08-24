import { subscribe } from "./subscribe-controller.js";

import { ctrlWrapper } from "../../helpers/index.js";

const subscribeController = {
	subscribe: ctrlWrapper(subscribe),
};

export { subscribeController };