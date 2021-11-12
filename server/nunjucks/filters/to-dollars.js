function toDollars(value) {
  const valueAsString = Number(value).toFixed(2);
  const periodIndex = valueAsString.indexOf(".");
  return valueAsString.slice(0, periodIndex + 3);
}

module.exports = {
  toDollars
}