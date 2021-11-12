import { http } from "./../utils/http";

export class InvoiceService {
  static async addInvoice(invoiceData) {
    try {
      const { data } = await http.post("/api/invoice", invoiceData);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
