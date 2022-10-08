function getRandomInteger(min, max) {
  const lower = min;
  const upper = max;
  return Math.random() * (upper - lower + 1) - lower;
}

if (getRandomInteger < 0) {
  console.log(NaN);
}
