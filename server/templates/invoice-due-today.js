export const invoiceDueTodayTemplate = `
<mjml>
<mj-body>
  <mj-section>
    <mj-column>
      <mj-text>Dear Customer,</mj-text>
      <mj-text>Your invoice for $<%=invoiceTotal%> is due today.</mj-text>
      <mj-text>If you've already paid, please disregard this email.</mj-text>
      <mj-text>Invoice: <%=invoiceNumber%> </mj-text>
      <mj-text>Issue Date: <%=issueDate%></mj-text>
      <mj-text>Invoice Total: <%=invoiceTotal%></mj-text>
      <mj-text>Due Amount: <%=invoiceTotal%></mj-text>
      <mj-text>Due Date: <%=dueDate%></mj-text>
      <mj-text><p><a href="https://www.google.com" target="_blank">Click here to make a payment</a></p></mj-text>
        
      <mj-text>Best regards,</mj-text>
      <mj-text><%=firstName%></mj-text>
    </mj-column>
  </mj-section>
</mj-body>
</mjml>
    `;
