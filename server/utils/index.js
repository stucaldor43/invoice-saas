function underscoreToCamelCase(word) {
  return word
    .split("")
    .map((char, index, arr) => {
      if (index > 0 && arr[index - 1] === "_") return char.toUpperCase();
      return char;
    })
    .filter((char) => char !== "_")
    .join("");
}

function queryStringSortValueToObject(queryStringSortValue) {
  const isDescendingSort = queryStringSortValue.charAt(0) === "-";

  return queryStringSortValue
    .slice(isDescendingSort ? 1 : 0)
    .split(",")
    .map((underScoreFormattedSortColumnName) => {
      return {
        [underscoreToCamelCase(underScoreFormattedSortColumnName)]:
          isDescendingSort ? "desc" : "asc",
      };
    });
}

function queryStringFiltersToObject(query) {
  return Object.keys(query)
    .filter((word) => !["limit", "offset", "sort"].includes(word))
    .reduce((acc, camelCaseColumnName) => {
      if (query[camelCaseColumnName].eq) {
        query[camelCaseColumnName].equals = query[camelCaseColumnName].eq;
        delete query[camelCaseColumnName].eq;
      }

      const filterNameToFilterValueMap = {
        [underscoreToCamelCase(camelCaseColumnName)]:
          query[camelCaseColumnName],
      };

      return { ...acc, ...filterNameToFilterValueMap };
    }, {});
}

module.exports = {
    underscoreToCamelCase,
    queryStringSortValueToObject,
    queryStringFiltersToObject
}