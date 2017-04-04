function cormenInsertionSort(array) {
	for (let i = 1; i < array.length; i++) {
		let element = array[i]
		let j = i - 1
		while (j >= 0 && element < array[j]) {
			array[j + 1] = array[j]
			j--
		} element = array[j + 1]
	} return array
}