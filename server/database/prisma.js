const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["info", "query"],
  rejectOnNotFound: true,
});

module.exports = {
  prisma
}