import { addUser } from "../../models/user";

const users = [
  {
    password: "abcdefgh",
    email: "Urkel",
    plan: "BASIC",
  },
  {
    password: "abc",
    email: "iressa@gmail.com",
    plan: "BASIC",
  },
  {
    password: "abc",
    email: "realbenstone@gmail.com",
    plan: "BASIC",
  },
];

export async function seedUsers() {
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
