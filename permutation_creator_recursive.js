function permutations(array) {
  var subarray;
  var firstElement;
  var nextElements;
  var returnArray = [];
  
  if (array.length === 2) {
    return [[array[0], array[1]], [array[1], array[0]]];
  } else {
    for (var i = 0; i < array.length; i++) {
      subarray = sliceOutElement(array, i);
      firstElement = array[i];
      nextElements = generateListOfAnagrams(subarray);
      
      for (var j = 0; j < nextElements.length; j++) {
        returnArray.push([firstElement].concat(nextElements[j]));
      }
      
    }
  } return returnArray;
}