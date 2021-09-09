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

  const additionalData = getClientTypeSpecificFields(clientType);

  function getClientTypeSpecificFields(type) {
    let fields = {};

    switch (type) {
      case "INDIVIDUAL":
        fields = { firstName, lastName };
        break;
      case "COMPANY":
        fields = { companyName };
        break;
      default:
        throw Error("Illegal client type provided");
    }

    return fields;
  }

  const client = await prisma.client.create({
    data: {
      email,
      clientType,
      userId: user.id,
      address: { create: { address1, zipCode, city, state } },
      ...additionalData,
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
      OR: [
        {
          firstName: {
            contains: searchTerm,
          },
        },
        {
          lastName: {
            contains: searchTerm,
          },
        },
      ],
    },
    take: pagination.take,
    skip: pagination.skip,
    orderBy: sort,
  });

  const clientCount = await prisma.client.count({
    where: {
      OR: [
        {
          firstName: {
            contains: searchTerm,
          },
        },
        {
          lastName: {
            contains: searchTerm,
          },
        },
      ],
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
