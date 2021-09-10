export function pad(value) {
  return value >= 1 && value <= 9 ? `0${value}` : value;
}
