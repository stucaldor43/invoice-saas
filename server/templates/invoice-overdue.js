export const invoiceOverdueEmailTemplate = `
<mjml>
<mj-body>
  
  <mj-section>
    <mj-column>
      <mj-text>Dear Customer,</mj-text>
      <mj-text>This is a reminder that payment for invoice #<%=invoiceNumber%> is <%=daysOverdue%> days overdue.</mj-text>
      <mj-text>If you've already paid, please disregard this email.</mj-text>
      <mj-text><a href="https://www.google.com" target="_blank">Click here to make a payment</a></mj-text>
      <mj-text>Kind regards,</mj-text>
      <mj-text><%=firstName%></mj-text>
    </mj-column>
  </mj-section>
</mj-body>
</mjml>
    `;
