function efficientPairSumCheck(numbers, goal) {
  var numbersObj = {};
  var number;
  var currentNumber;
  var goalMatch;
  
  for (var i = 0; i < numbers.length; i++) {
    number = numbers[i];
    
    if (numbersObj[number]) {
      numbersObj[number + 'a'] = true;
    } else {
      numbersObj[number] = true;
    }
  }
    
  for (var j = 0; j < numbers.length; j++) {
    currentNumber = numbers[j];
    goalMatch = goal - currentNumber;
    
    if (numbersObj[goalMatch] && currentNumber !== goalMatch) {
      return true;
    } else if (numbersObj[goalMatch] && currentNumber === goalMatch && numbersObj[goalMatch + 'a']) {
      return true;
    }
  }
  
  return false;
}