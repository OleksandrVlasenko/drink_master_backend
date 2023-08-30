import { getRandomInt } from "./index.js";

function getArrayWithThreeItems(array) {
	const arrayLength = array.length;

	if (arrayLength <= 3) {
		return array;
	}

	const a = getRandomInt(arrayLength - 1);
	const b = getRandomInt(arrayLength - 1);
	const c = getRandomInt(arrayLength - 1);

	if (a === b || b === c || a === c) {
		return getArrayWithThreeItems(array);
	} else {
		return [array[a], array[b], array[c]];
	}
}

export { getArrayWithThreeItems };
