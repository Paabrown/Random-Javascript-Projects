//(Relatively) inefficient method for sorting an array
//Transcribed into javascript from description in Cormen's "Algorithms Unlocked"

function selectionSort(array) {
	debugger
	let indexOfSmallest = 0
	let beginningOfSubArray = 0
	let endOfSubArray = array.length
	let cloneArray = array.slice(0)

	while (beginningOfSubArray <= endOfSubArray) {
		indexOfSmallest = beginningOfSubArray
		let changeCounter = 0

		for (var i = beginningOfSubArray; i <= endOfSubArray; i++) {
			if (cloneArray[i] < cloneArray[indexOfSmallest]) {
				indexOfSmallest = i
				changeCounter++
			}
		} if (changeCounter > 0) {
			let holder1 = cloneArray[indexOfSmallest]
			let holder2 = cloneArray[beginningOfSubArray]
			cloneArray[beginningOfSubArray] = holder1
			cloneArray[indexOfSmallest] = holder2
		} beginningOfSubArray++		
	} return cloneArray
} 
