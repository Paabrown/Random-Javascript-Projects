//First attempt. 
//Seems like there's a more elegant way to accomplish lines 47-50.


function factorization(n) {
	let current = n
	let next = []
	let primeFactors = []

	while(current) {
		let largestPossibleFactor = Math.round(current/2)

//This code should do the dual purpose of checking if the current number is prime AND
	//checking if there are any factors of the current number.

//If there are ANY factors, it should return them and put them into next. Current can be discarded.
	//Added a check to see if any of the factors are already in next or are recognized prime factors

//If there are NOT, current should go into factors.

		if (!primeFactors.includes(current)) {
			let factorCount = 0
			let preNext = []
			
			//This is where we find the factors and # of factors of our current number
			for (var i = 2; i <= largestPossibleFactor; i++) {
				if (current % i === 0) {
					preNext.push(i)
					preNext.push(current/i)
					factorCount ++
				} 
			} 
			//And then add the current number if it's prime
			if (factorCount === 0) {
					primeFactors.push(current)
			} else {

			//And then, if it's not prime, we add any factors we found to next
			//(as long as we haven't dealt with them already)
				for (var i = preNext.length - 1; i >= 0; i--) {
					if (!primeFactors.includes(preNext[i]) && !next.includes(preNext[i])) {
						next.push(preNext[i])
					}
				}
			}
		}
		//Reload current with our list of factors to check next
		 current = next.shift(0)
	} 
	//Add 1 if it's not there already
	if (!primeFactors.includes(1)) {
		primeFactors.push(1)
	} 
	return primeFactors
}