function deepEqual(thing1, thing2) {
  var type1 = typeof thing1;
  var type2 = typeof thing2;
  
  if ((type1 !== 'object' || type1 === null) || (type2 !== 'object' || type2 === null)) {
    return thing1 === thing2;
  } else {
    for (var key in thing1) {
      if (!deepEqual(thing1[key], thing2[key])) {
        return false;
      }
    } return true;
  }
}