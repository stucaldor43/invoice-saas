import { prisma } from "./../database/prisma";

export async function addInvoice(data, { user }) {
  const { dateDue, posthookUrl, total, taxRate, subTotal, notes, clientId } =
    data;

  const invoice = await prisma.invoice.create({
    data: {
      dateDue,
      status: "PENDING",
      posthookUrl,
      total,
      taxRate,
      subTotal,
      pdfUrl: "",
      notes,
      template: "",
      dateSent: data.issueDate,
      isRecurring: false,
      billingType: "ONCE",
      userId: user.id,
      clientId,
      items: {
        createMany: {
          data: data.items,
        },
      },
    },
  });

  return invoice;
}

export async function getInvoice(filters) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { ...filters },
    });

    return invoice;
  } catch (error) {
    throw error;
  }
}

export async function getInvoices({ filters, pagination, sort }) {
  const invoices = await prisma.invoice.findMany({
    where: filters,
    take: pagination.take,
    skip: pagination.skip,
    orderBy: sort,
    include: {
      user: true,
      client: true,
    },
  });

  const invoiceCount = await prisma.invoice.count({
    where: filters,
    orderBy: sort,
  });

  return {
    invoices,
    recordTotal: invoiceCount,
    hasMore: pagination.take + pagination.skip < invoiceCount,
    pageCount: Math.ceil(invoiceCount / pagination.take),
  };
}

export async function editInvoice(id, newInvoiceData) {
  const originalInvoice = await getInvoice({ invoiceId: id });

  const invoice = await prisma.invoice.update({
    where: { invoiceId: id },
    data: { ...originalInvoice, ...newInvoiceData },
  });

  return invoice;
}
