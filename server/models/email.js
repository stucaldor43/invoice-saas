const { prisma } = require("./../database/prisma");

async function createEmail({ template, message, locals, response }) {
  const email = await prisma.email.create({
    data: {
      template,
      message,
      locals,
      response,
    },
  });

  return email;
}

module.exports = {
  createEmail
}