export const invoiceDueSoonEmailTemplate = `
<mjml>
<mj-body>
  <mj-section>
    <mj-column>
      <mj-text>Dear Customer,</mj-text>
      <mj-text>Just a reminder that invoice <%=invoiceNumber%> for $<%=invoiceTotal%> is due in 3 days.</mj-text>
      <mj-text>Let me know if you have any issues or questions.</mj-text>
      <mj-text>Invoice: <%=invoiceNumber%> </mj-text>
      <mj-text>Issue Date: <%=issueDate%></mj-text>
      <mj-text>Invoice Total: <%=invoiceTotal%></mj-text>
      <mj-text>Due Amount: <%=invoiceTotal%></mj-text>
      <mj-text>Due Date: <%=dueDate%></mj-text>
      <mj-text><a href="https://www.google.com" target="_blank">Click here to make a payment</a></mj-text>
        
      <mj-text>Best regards,</mj-text>
      <mj-text><%=userFullName%></mj-text>
    </mj-column>
  </mj-section>
</mj-body>
</mjml>
    `;
