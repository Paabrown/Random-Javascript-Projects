function merge(array1, array2) {
	array1.push(Infinity);
	array2.push(Infinity);
	let newArray = [];

	while (array1.length > 1 || array2.length > 1) {
		if (array1[0] < array2[0]) {
			newArray.push(array1.shift());
		} else {
			newArray.push(array2.shift());
		}
	} return newArray
}

function mergeSort(array) {
	let newArray = [];

	if (array.length === 1) {
		return array;
	} else {
		let halfwayIndex = Math.floor((array.length) / 2) - 1;
		let array1 = array.slice(0, halfwayIndex + 1);
		let array2 = array.slice(halfwayIndex + 1);
		let array1a = mergeSort(array1);
		let array2a = mergeSort(array2);

		newArray = merge(array1a, array2a);

		return newArray;
	}
}`