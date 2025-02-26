require("dotenv").config();
const fs = require("fs");
const path = require("path");

const MailerSend = require("mailersend").MailerSend;
const EmailParams = require("mailersend").EmailParams;
const Sender = require("mailersend").Sender;
const Recipient = require("mailersend").Recipient;
const Attachment = require("mailersend").Attachment;

async function sendEmail({
  from,
  to,
  replyTo,
  subject,
  html,
  text,
  attachments = [],
}) {
  const API_KEY = process.env.MAILERSEND_API_KEY;
  let mailerSend;

  if (API_KEY) {
    mailerSend = new MailerSend({ apiKey: API_KEY });
  } else {
    throw new Error("Missing MailerSend API key.");
  }

  const sentFrom = new Sender(from.email, from.name);
  const recipients = to.map((email) => new Recipient(email));

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(new Sender(replyTo.email, replyTo.name))
    .setAttachments(attachments)
    .setSubject(subject)
    .setHtml(html)
    .setText(text);

  const logoPath = path.join(process.cwd(), "public", "logo.png");
  const logoObject = new Attachment(
    fs.readFileSync(logoPath, { encoding: "base64" }),
    "logo.png",
    "inline",
    "0123456789"
  );

  let attachmentObjects = [];
  // Add attachments if provided
  if (attachments.length > 0) {
    attachmentObjects = attachments.map(
      (attachment) =>
        new Attachment(
          fs.readFileSync(attachment.path, { encoding: "base64" }),
          attachment.filename,
          attachment.disposition || "attachment",
          attachment.cid || undefined
        )
    );
  }

  attachmentObjects = [...attachmentObjects, logoObject];
  emailParams.setAttachments(attachmentObjects);

  try {
    const res = await mailerSend.email.send(emailParams);
    console.log("MAILER SEND STATUS:", res.statusCode);
  } catch (error) {
    console.log("ERROR IN EMAIL SERVICE:", JSON.stringify(error, null, 2));
    // return error
  }
}

module.exports = {
  sendEmail,
};
