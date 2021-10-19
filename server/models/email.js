import { prisma } from "./../database/prisma";

export async function createEmail({ template, message, locals, response }) {
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
