import { prisma } from "../database/prisma";

export async function addUser({ email, password, plan }) {
  try {
    const user = await prisma.user.create({
      data: { email, password, plan },
      select: { id: true, email: true, role: true },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUser(filters) {
  try {
    const user = await prisma.user.findUnique({
      where: { ...filters },
      select: { id: true, email: true, role: true },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id) {
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

export async function getUserByCredentials({ email, password }) {
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
