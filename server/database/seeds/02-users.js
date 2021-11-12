const { addUser } = require("../../models/user");

const users = [
  {
    password: "abcdefgh",
    email: "Urkel",
    plan: "BASIC",
    phone: "832-238-8472",
    firstName: "Steve",
    lastName: "Urkel",
  },
  {
    password: "abc",
    email: "iressa@gmail.com",
    plan: "BASIC",
    phone: "288-499-9201",
    firstName: "Iressa",
    lastName: "Nolan",
  },
  {
    password: "abc",
    email: "realbenstone@gmail.com",
    plan: "BASIC",
    phone: "837-918-3820",
    firstName: "Ben",
    lastName: "Stone",
  },
];

async function seedUsers() {
  return Promise.all(users.map((user) => addUser(user))).then(
    () => (process.exitCode = 1)
  );
}

seedUsers()
  .then(() => {
    console.log("seeded users");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    process.exit(0);
  });

module.exports = {
  seedUsers
}
