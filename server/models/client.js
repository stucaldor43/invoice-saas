import { prisma } from "./../database/prisma";

export async function addClient(data, { user }) {
  const {
    firstName,
    lastName,
    companyName,
    email,
    clientType,
    address1,
    zipCode,
    city,
    state,
  } = data;

  const client = await prisma.client.create({
    data: {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      companyName,
      email,
      clientType,
      userId: user.id,
      address: { create: { address1, zipCode, city, state } },
    },
  });

  return client;
}

export async function getClients({ filters, pagination, sort }) {
  const clients = await prisma.client.findMany({
    where: filters,
    take: pagination.take,
    skip: pagination.skip,
    orderBy: sort,
  });

  const clientCount = await prisma.client.count({
    where: filters,
    orderBy: sort,
  });

  return {
    clients,
    recordTotal: clientCount,
    hasMore: pagination.take + pagination.skip < clientCount,
    pageCount: Math.ceil(clientCount / pagination.take),
  };
}

export async function getClientsBySearchTerm({ searchTerm, pagination, sort }) {
  const clients = await prisma.client.findMany({
    where: {
      fullName: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    take: pagination.take,
    skip: pagination.skip,
    orderBy: sort,
  });

  const clientCount = await prisma.client.count({
    where: {
      fullName: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    orderBy: sort,
  });

  return {
    clients,
    recordTotal: clientCount,
    hasMore: pagination.take + pagination.skip < clientCount,
    pageCount: Math.ceil(clientCount / pagination.take),
  };
}
