export const empty = (obj) => {
	if (
		obj === null ||
		obj === undefined ||
		obj === '' ||
		!Object.keys(obj).length
	)
		return true;
};
