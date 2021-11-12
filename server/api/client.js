const express = require("express");
const {
  addClient,
  getClient,
  getClients,
  getClientsBySearchTerm,
} = require("./../models/client");
const { authorize } = require("../middleware/auth");

const router = express.Router();

// router.get("/:id", authorize("create:client"), async function (req, res) {
//   const id = Number(req.params.id);
//   if (req.session.user.id !== Number(id)) return res.sendStatus(401);

//   try {
//     const user = await getUser({ id });

//     res.status(201).json(user);
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });

router.post("/", authorize("create:client"), async function (req, res) {
  try {
    const client = addClient(req.body, { user: req.session.user });

    res.status(201).json(client);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

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
  // .reduce(function (acc, element) {
  //   return { ...acc, ...element };
  // }, {});
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

router.get("/", authorize("read:client"), async function (req, res) {
  try {
    // /api/client?first_name[eq]=Mack&last_name[contains]=Johnson&sort=-last_name&limit=20&offset=0
    //
    // filters = {firstName: {equals: Mack }} pagination = {take: 20, skip: 0} sort = {firstName: "desc", lastName: "desc"}
    const pagination = {
      take: Number(isNaN(req.query.limit) ? 20 : req.query.limit),
      skip: Number(isNaN(req.query.offset) ? 0 : req.query.offset),
    };

    // const orderBy =
    //   req.query.sort && req.query.charAt(0) !== "-" ? "asc" : "desc";
    const sort = req.query.sort
      ? queryStringSortValueToObject(req.query.sort)
      : [{ firstName: "asc" }];

    const filters =
      Object.keys(req.query).filter(
        (word) => !["limit", "offset", "sort"].includes(word)
      ).length === 0
        ? {}
        : queryStringFiltersToObject(req.query);

    const clients = await getClients({ pagination, filters, sort });

    res.status(200).json(clients);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/:id", authorize("read:client"), async function (req, res) {
  try {
    const client = await getClient({ clientId: Number(req.params.id) });
    if (req.session.user.id !== client.user.id) return res.sendStatus(401);

    res.status(201).json(client);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/search", authorize("read:client"), async function (req, res) {
  try {
    const pagination = {
      take: Number(isNaN(req.query.limit) ? 20 : req.query.limit),
      skip: Number(isNaN(req.query.offset) ? 0 : req.query.offset),
    };

    const sort = req.query.sort
      ? queryStringSortValueToObject(req.query.sort)
      : [{ firstName: "asc" }];

    const searchTerm = decodeURI(req.query.q);

    const clients = await getClientsBySearchTerm({
      searchTerm,
      pagination,
      sort,
    });

    res.status(200).json(clients);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
