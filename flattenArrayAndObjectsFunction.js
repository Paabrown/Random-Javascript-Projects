function flattenToArray(arrayOrObject) {
	let current = arrayOrObject
	let finalArray = []
	let next = []

	while (current) {
		switch (typeof current) {
			case "array":
				for (var i = current.length - 1; i >= 0; i--) {
					next.push(current[i])
				} break;
			case "object":
				let obArray = Object.values(current)
				for (var i = obArray.length - 1; i >= 0; i--) {
					next.push(obArray[i])
				} break;
			default:
				finalArray.push(current)
		} current = next.shift()
	} return finalArray
}