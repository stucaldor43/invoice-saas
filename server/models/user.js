const { prisma } = require("./../database/prisma");

async function addUser({
  email,
  password,
  plan,
  phone,
  firstName,
  lastName,
}) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        plan,
        phone,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
      },
      select: { id: true, email: true, role: true },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser(filters) {
  try {
    const user = await prisma.user.findUnique({
      where: { ...filters },
      select: {
        id: true,
        email: true,
        role: true,
        phone: true,
        firstName: true,
        lastName: true,
        fullName: true,
        address: {
          select: {
            addressId: true,
            address1: true,
            city: true,
            state: true,
            zipCode: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const user = await prisma.user.delete({
      where: id,
      select: { email: true },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByCredentials({ email, password }) {
  try {
    const user = await prisma.user.findFirst({
      where: { email, password },
      select: { id: true, email: true, role: true },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addUser,
  getUser,
  deleteUser,
  getUserByCredentials
}
