//Search Sorted List algorithm. Translated into code from the explanation in Cormen's Introduction to Algorithms
//Only works for positive integers and for strings sorted in an ascending manner.
//Probably works for booleans too, if that's what you're into.

function binarySearchSorted(array, value) {
	let length = array.length
	let finalElement = array.length -1
	let firstElement = 0

	while (firstElement <= finalElement) {
		//This variable "current" is kind of awkard - I convert it back to normal counting numbers to find the 
		//halfway point, and then convert it back to an index-type value (by subtracting 1).
		let current = Math.floor((2 + firstElement + finalElement)/2) - 1


		if (array[current] === value) {
			return `first index of value in array is ${current}`
		} else if (value < array[current]) {
			finalElement = current - 1
		} else if (value > array[current]) {
			firstElement = current + 1
		}

		} return "Not Found"
	}