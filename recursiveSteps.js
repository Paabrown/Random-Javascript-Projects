function recursiveSteps(steps) {
  var total = 1;

  for (var i = 2; i <= steps; i++) {
    total += recursiveSteps(steps - i);
  }

  return total;
}