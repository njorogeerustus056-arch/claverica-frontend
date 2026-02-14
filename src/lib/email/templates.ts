// src/lib/email/templates.ts
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export const notificationEmailTemplates: Record<string, (data: any) => EmailTemplate> = {
  PAYMENT_RECEIVED: (data) => ({
    subject: `💰 Payment Received - $${data.amount}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0d9488, #047857); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Payment Received!</h1>
        </div>
        <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Hello <strong>${data.account_name}</strong>,
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We're pleased to inform you that a payment of <strong>$${data.amount}</strong> has been 
            credited to your account from <strong>${data.sender}</strong>.
          </p>
          <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0d9488;">
            <p style="margin: 0; color: #374151;">
              <strong>Reference:</strong> ${data.reference}<br>
              <strong>Date:</strong> ${new Date(data.timestamp).toLocaleDateString()}<br>
              <strong>New Balance:</strong> $${data.new_balance}
            </p>
          </div>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            You can view this transaction in your dashboard anytime.
          </p>
          <a href="${data.dashboard_url}" style="display: inline-block; background: #0d9488; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px;">
            View in Dashboard
          </a>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            This is an automated notification from Claverica Financial System.<br>
            If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    `,
    text: `
      Payment Received - $${data.amount}
      
      Hello ${data.account_name},
      
      We're pleased to inform you that a payment of $${data.amount} has been 
      credited to your account from ${data.sender}.
      
      Reference: ${data.reference}
      Date: ${new Date(data.timestamp).toLocaleDateString()}
      New Balance: $${data.new_balance}
      
      You can view this transaction in your dashboard anytime: ${data.dashboard_url}
      
      This is an automated notification from Claverica Financial System.
      If you have any questions, please contact our support team.
    `
  }),

  TAC_SENT: (data) => ({
    subject: '🔐 Your TAC Code for Transfer Authorization',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6366f1, #4f46e5); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Your TAC Code</h1>
        </div>
        <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Hello <strong>${data.account_name}</strong>,
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Your Transaction Authorization Code (TAC) is:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background: #f8fafc; padding: 20px 40px; border-radius: 8px; border: 2px dashed #6366f1;">
              <h2 style="color: #6366f1; font-size: 36px; letter-spacing: 10px; margin: 0;">${data.tac_code}</h2>
            </div>
          </div>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            <strong>Purpose:</strong> ${data.purpose}<br>
            <strong>Expires:</strong> ${new Date(data.expires_at).toLocaleString()}
          </p>
          <div style="background: #fef2f2; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <p style="margin: 0; color: #dc2626; font-size: 14px;">
              <strong>⚠️ SECURITY WARNING:</strong> Never share this code with anyone. 
              Claverica staff will never ask for your TAC code.
            </p>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            This TAC code is valid for 10 minutes only.<br>
            If you didn't request this code, please contact support immediately.
          </p>
        </div>
      </div>
    `,
    text: `
      Your TAC Code for Transfer Authorization
      
      Hello ${data.account_name},
      
      Your Transaction Authorization Code (TAC) is: ${data.tac_code}
      
      Purpose: ${data.purpose}
      Expires: ${new Date(data.expires_at).toLocaleString()}
      
      ⚠️ SECURITY WARNING: Never share this code with anyone. 
      Claverica staff will never ask for your TAC code.
      
      This TAC code is valid for 10 minutes only.
      If you didn't request this code, please contact support immediately.
    `
  }),

  KYC_APPROVED: (data) => ({
    subject: '✅ Your KYC Verification is Complete',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">KYC Verification Approved!</h1>
        </div>
        <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Hello <strong>${data.account_name}</strong>,
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We're happy to inform you that your KYC (Know Your Customer) verification has been 
            successfully approved!
          </p>
          <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <div style="background: white; width: 60px; height: 60px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <span style="color: #10b981; font-size: 30px;">✓</span>
            </div>
            <h3 style="color: #065f46; margin: 10px 0; font-size: 20px;">Verification Complete</h3>
            <p style="color: #065f46; margin: 0;">
              Your account is now fully verified and activated.
            </p>
          </div>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            With your verified account, you now have access to:
          </p>
          <ul style="color: #374151; font-size: 16px; line-height: 1.6; padding-left: 20px;">
            <li>Higher transaction limits</li>
            <li>Full account features</li>
            <li>Enhanced security options</li>
            <li>Priority customer support</li>
          </ul>
          <a href="${data.dashboard_url}" style="display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px;">
            Access Your Dashboard
          </a>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            Thank you for completing the verification process.<br>
            Welcome to the Claverica community!
          </p>
        </div>
      </div>
    `,
    text: `
      Your KYC Verification is Complete
      
      Hello ${data.account_name},
      
      We're happy to inform you that your KYC (Know Your Customer) verification has been 
      successfully approved!
      
      Your account is now fully verified and activated.
      
      With your verified account, you now have access to:
      • Higher transaction limits
      • Full account features
      • Enhanced security options
      • Priority customer support
      
      Access your dashboard: ${data.dashboard_url}
      
      Thank you for completing the verification process.
      Welcome to the Claverica community!
    `
  }),

  TRANSFER_COMPLETED: (data) => ({
    subject: `✅ Transfer Completed - $${data.amount}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Transfer Completed!</h1>
        </div>
        <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Hello <strong>${data.account_name}</strong>,
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Your transfer of <strong>$${data.amount}</strong> has been successfully completed.
          </p>
          <div style="background: #f5f3ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6;">
            <p style="margin: 0; color: #374151;">
              <strong>To:</strong> ${data.recipient_name}<br>
              <strong>Account:</strong> ${data.recipient_account}<br>
              <strong>Reference:</strong> ${data.reference}<br>
              <strong>Date:</strong> ${new Date(data.timestamp).toLocaleDateString()}<br>
              <strong>Status:</strong> <span style="color: #10b981;">Completed ✓</span>
            </p>
          </div>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            The funds have been sent to the recipient's account. It may take 1-2 business days 
            to appear in their account depending on their bank.
          </p>
          <a href="${data.dashboard_url}" style="display: inline-block; background: #8b5cf6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px;">
            View Transaction Details
          </a>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            This is an automated confirmation of your completed transfer.<br>
            A receipt has been saved to your transaction history.
          </p>
        </div>
      </div>
    `,
    text: `
      Transfer Completed - $${data.amount}
      
      Hello ${data.account_name},
      
      Your transfer of $${data.amount} has been successfully completed.
      
      To: ${data.recipient_name}
      Account: ${data.recipient_account}
      Reference: ${data.reference}
      Date: ${new Date(data.timestamp).toLocaleDateString()}
      Status: Completed ✓
      
      The funds have been sent to the recipient's account. It may take 1-2 business days 
      to appear in their account depending on their bank.
      
      View transaction details: ${data.dashboard_url}
      
      This is an automated confirmation of your completed transfer.
      A receipt has been saved to your transaction history.
    `
  }),
};

// Helper function to generate email
export function generateNotificationEmail(
  notificationType: string,
  data: any
): EmailTemplate {
  const template = notificationEmailTemplates[notificationType];
  if (!template) {
    // Default template for unknown notification types
    return {
      subject: `Claverica: ${data.title || 'Notification'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>${data.title || 'Notification'}</h2>
          <p>${data.message || ''}</p>
          ${data.metadata ? `<pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${JSON.stringify(data.metadata, null, 2)}</pre>` : ''}
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This is an automated email from Claverica Financial System.
          </p>
        </div>
      `,
      text: `${data.title || 'Notification'}\n\n${data.message || ''}\n\n${data.metadata ? JSON.stringify(data.metadata, null, 2) : ''}\n\nThis is an automated email from Claverica Financial System.`
    };
  }
  
  return template(data);
}

// Format email data with defaults
export function formatEmailData(
  account: any,
  notification: any,
  baseUrl = 'http://localhost:3000'
): any {
  return {
    account_name: `${account.first_name} ${account.last_name}`,
    account_number: account.account_number,
    dashboard_url: `${baseUrl}/dashboard`,
    ...notification,
    ...(notification.metadata || {})
  };
}
