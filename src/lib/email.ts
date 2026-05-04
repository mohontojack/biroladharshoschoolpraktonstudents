interface SendRegistrationEmailParams {
  name: string;
  batch: string;
  phone: string;
  email?: string;
  profession?: string;
  location?: string;
  attending: string;
  guests: number;
  message?: string;
}

const EMAIL_USER = "mohontobacklinks22@gmail.com";
const EMAIL_TO = "mohontobacklinks22@gmail.com";

function buildHtmlEmail(data: SendRegistrationEmailParams): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0d3b2e, #1a5c46); padding: 32px; text-align: center; }
    .header h1 { color: #c8a45e; margin: 0 0 8px; font-size: 22px; }
    .header p { color: rgba(255,255,255,0.7); margin: 0; font-size: 14px; }
    .body { padding: 32px; }
    .greeting { font-size: 18px; color: #082a21; margin-bottom: 20px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0; }
    .info-item { background: #faf8f4; padding: 12px 16px; border-radius: 10px; border-left: 3px solid #c8a45e; }
    .info-item .label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .info-item .value { font-size: 15px; color: #082a21; font-weight: 600; }
    .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
    .status-yes { background: #e8f0eb; color: #0d3b2e; }
    .status-no { background: #fde8e8; color: #dc2626; }
    .message-box { background: #faf8f4; border-radius: 10px; padding: 16px; margin-top: 16px; border: 1px solid #e8f0eb; }
    .message-box .msg-label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .message-box p { margin: 0; color: #333; line-height: 1.6; font-size: 14px; }
    .footer { text-align: center; padding: 20px 32px; background: #faf8f4; border-top: 1px solid #eee; }
    .footer p { color: #999; font-size: 12px; margin: 4px 0; }
    .footer .gold { color: #c8a45e; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>&#127942; New Alumni Registration</h1>
      <p>BAHS Alumni Eid Reunion &amp; Farewell 2026</p>
    </div>
    <div class="body">
      <p class="greeting">A new registration has been received:</p>
      <div class="info-grid">
        <div class="info-item">
          <div class="label">Full Name</div>
          <div class="value">${data.name}</div>
        </div>
        <div class="info-item">
          <div class="label">Batch / Year</div>
          <div class="value">${data.batch}</div>
        </div>
        <div class="info-item">
          <div class="label">Phone</div>
          <div class="value">${data.phone}</div>
        </div>
        ${data.email ? `<div class="info-item"><div class="label">Email</div><div class="value">${data.email}</div></div>` : ''}
        ${data.profession ? `<div class="info-item"><div class="label">Profession</div><div class="value">${data.profession}</div></div>` : ''}
        ${data.location ? `<div class="info-item"><div class="label">Location</div><div class="value">${data.location}</div></div>` : ''}
        <div class="info-item">
          <div class="label">Attending</div>
          <div class="value"><span class="status ${data.attending === 'yes' ? 'status-yes' : 'status-no'}">${data.attending === 'yes' ? 'Yes' : 'No'}</span></div>
        </div>
        <div class="info-item">
          <div class="label">Guests</div>
          <div class="value">${data.guests}</div>
        </div>
      </div>
      ${data.message ? `
      <div class="message-box">
        <div class="msg-label">Message / Memory</div>
        <p>${data.message}</p>
      </div>` : ''}
    </div>
    <div class="footer">
      <p>Biral Adarsha High School &mdash; <span class="gold">Alumni Eid Reunion & Farewell 2026</span></p>
      <p>Contact: +8801705937212 | mohontobacklinks22@gmail.com</p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendRegistrationEmail(data: SendRegistrationEmailParams): Promise<void> {
  const emailPassword = process.env.EMAIL_APP_PASSWORD;

  // Skip email if no app password configured
  if (!emailPassword) {
    console.log("[email] EMAIL_APP_PASSWORD not configured, skipping email notification");
    return;
  }

  try {
    // Dynamic import to avoid Turbopack bundling issues
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: emailPassword,
      },
    });

    const htmlContent = buildHtmlEmail(data);

    await transporter.sendMail({
      from: `"BAHS Alumni Reunion" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject: `New Registration: ${data.name} (${data.batch}) - BAHS Alumni Reunion 2026`,
      html: htmlContent,
      replyTo: data.email || EMAIL_USER,
    });

    console.log(`[email] Registration notification sent for ${data.name}`);

    // If registrant provided email, send them a confirmation too
    if (data.email && data.email !== EMAIL_USER) {
      await transporter.sendMail({
        from: `"BAHS Alumni Reunion" <${EMAIL_USER}>`,
        to: data.email,
        subject: "Registration Confirmed! - BAHS Alumni Eid Reunion & Farewell 2026",
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0d3b2e, #1a5c46); padding: 32px; text-align: center; }
    .header h1 { color: #c8a45e; margin: 0 0 8px; font-size: 22px; }
    .header p { color: rgba(255,255,255,0.7); margin: 0; font-size: 14px; }
    .body { padding: 32px; }
    .body h2 { color: #082a21; margin-top: 0; }
    .body p { color: #555; line-height: 1.7; }
    .highlight { background: #e8f0eb; padding: 16px 20px; border-radius: 10px; margin: 20px 0; }
    .highlight strong { color: #0d3b2e; }
    .contact-box { background: #faf8f4; padding: 16px 20px; border-radius: 10px; margin-top: 20px; text-align: center; }
    .contact-box p { margin: 6px 0; color: #666; font-size: 14px; }
    .contact-box a { color: #0d3b2e; font-weight: 600; text-decoration: none; }
    .footer { text-align: center; padding: 20px 32px; background: #faf8f4; border-top: 1px solid #eee; }
    .footer p { color: #999; font-size: 12px; margin: 4px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>&#9989; Registration Confirmed!</h1>
      <p>BAHS Alumni Eid Reunion &amp; Farewell 2026</p>
    </div>
    <div class="body">
      <h2>Dear ${data.name},</h2>
      <p>Thank you for registering for the <strong>Biral Adarsha High School Alumni Eid Reunion & Farewell Ceremony 2026</strong>!</p>
      <div class="highlight">
        <p>Your registration has been recorded successfully.</p>
        <p><strong>Batch:</strong> ${data.batch} &nbsp;|&nbsp; <strong>Status:</strong> ${data.attending === "yes" ? "Attending" : "Not Attending"}</p>
        ${data.guests > 0 ? `<p><strong>Guests:</strong> ${data.guests}</p>` : ""}
      </div>
      <p>The final event date (2nd or 3rd day of Eid-ul-Azha), time, and detailed schedule will be communicated to all registered attendees. Please keep an eye on your inbox or contact us for updates.</p>
      <div class="contact-box">
        <p>Need help? Reach out to us:</p>
        <p>&#128222; <a href="tel:+8801705937212">+8801705937212</a></p>
        <p>&#128231; <a href="mailto:mohontobacklinks22@gmail.com">mohontobacklinks22@gmail.com</a></p>
      </div>
    </div>
    <div class="footer">
      <p>Biral Adarsha High School &mdash; Alumni Eid Reunion & Farewell 2026</p>
      <p>We look forward to seeing you!</p>
    </div>
  </div>
</body>
</html>`,
      });
      console.log(`[email] Confirmation email sent to ${data.email}`);
    }
  } catch (error) {
    // Log error but don't fail the registration
    console.error("[email] Failed to send email:", error);
  }
}
