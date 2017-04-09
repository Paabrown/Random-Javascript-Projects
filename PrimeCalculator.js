//This function calculates the nth prime number

function primeCalculator(n) {
	let knownPrimes = [2];
	let currentNumber = 3;
	let operations = 0

	while (knownPrimes.length < n) {
		let doesItHavePrimeFactors = false;
		let i = 0;

		while (i < knownPrimes.length && !doesItHavePrimeFactors && knownPrimes[i] <= currentNumber/2) {
			if (currentNumber % knownPrimes[i] === 0) {
				doesItHavePrimeFactors = true;
			}

			i++;
			operations++;
		}

		if (!doesItHavePrimeFactors) {
			knownPrimes.push(currentNumber)
		}

		currentNumber += 2;
	}

	let nthPrime = knownPrimes[knownPrimes.length - 1];

	console.log(nthPrime);
	console.log(`operations performed: ${operations}`);
	return nthPrime;
}

primeCalculator(10000);

