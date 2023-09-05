import { User } from "../models/user.js";

async function showModal(user, modalName) {
	let showModalFirstRecipe = false;
	let showModalTenthRecipe = false;
	const { _id: userId } = user;
	const { counter, isShownFirstRecipe, isShownTenthRecipe } =
		user.showModal[modalName];
	const a = `showModal.${modalName}.isShownFirstRecipe`;
	const b = `showModal.${modalName}.isShownTenthRecipe`;

	if (counter === 1 && !isShownFirstRecipe) {
		showModalFirstRecipe = true;
		await User.findByIdAndUpdate(userId, {
			[a]: true,
		});
	}

	if (counter === 10 && !isShownTenthRecipe) {
		showModalTenthRecipe = true;
		await User.findByIdAndUpdate(userId, {
			[b]: true,
		});
	}

	return { showModalFirstRecipe, showModalTenthRecipe };
}

export { showModal };
