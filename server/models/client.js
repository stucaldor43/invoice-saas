const { prisma } = require("./../database/prisma");

async function addClient(data, { user }) {
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
    phone,
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
      phone,
    },
  });

  return client;
}

async function getClient(filters) {
  try {
    const client = await prisma.client.findUnique({
      where: { ...filters },
      select: {
        clientId: true,
        email: true,
        companyName: true,
        firstName: true,
        lastName: true,
        fullName: true,
        phone: true,
        address: {
          select: {
            addressId: true,
            address1: true,
            city: true,
            state: true,
            zipCode: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    });
    return client;
  } catch (error) {
    console.log(error);
  }
}

async function getClients({ filters, pagination, sort }) {
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

async function getClientsBySearchTerm({ searchTerm, pagination, sort }) {
  const clients = await prisma.client.findMany({
    where: {
      fullName: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      address: true,
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

module.exports = {
  addClient,
  getClient,
  getClients,
  getClientsBySearchTerm
}