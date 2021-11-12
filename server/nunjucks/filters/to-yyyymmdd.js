function iso8601toYYYYMMDD(value) {
  return value.split("T")[0];
}

module.exports = {
  iso8601toYYYYMMDD
}