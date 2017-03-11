//These are increasingly efficient algorithms for finding a value in an array.

//Test Test

function linearSearch(array, value) {
	var n = array.length - 1

	var answer = "Not Found"

	for (var i = 0; i <= n; i++) {
		if (array[i] === value) {

			answer = i
		}	
	} return answer
}

function betterLinearSearch(array, value) {
	var n = array.length - 1

	for (var i = 0; i <= n; i++) {
		if (array[i] === value) {

			answer = i

			return answer
		}
	}  return "Not Found"
}

function sentinelLinearSearch(array, value) {
	var n = array.length - 1

	var last = array[n]

	array.pop()

	array.push(value)

	var i = 0

	while (array[i] !=  value) {
		i++
	}

	array.pop()

	array.push(last)

	if ((i < n) || (last === value)) {
		return i
	} return "Not Found"
}