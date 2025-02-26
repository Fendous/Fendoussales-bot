"use server";
import { sendEmail } from "@/lib/services/email";

export async function entreprisePlanRequest(form: FormData) {
  const email = form.get("email") as string;
  const contact_name = form.get("contact_name") as string;
  const business_name = form.get("business_name") as string;
  const phone = form.get("phone") as string;
  const title = form.get("title") as string;

  const emailParams = {
    from: { email: "support@fendousai.com" },
    to: ["arunima@fendous.com"],
    replyTo: { email: email, name: business_name },
    subject: "Entreprise Plan Request",
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Entreprise Plan Request</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
          }
          .header img {
            max-width: 150px;
            height: auto;
          }
          .content {
            padding: 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #cd0ab0;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background-color: #d009f3;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #888;
          }
          .download-button {
            display: inline-block;
            border-radius: 0.375rem; /* 6px */
            border: 1px solid #4f46e5; /* indigo-600 */
            background-color: #4f46e5; /* indigo-600 */
            padding: 0.75rem 3rem; /* px-12 py-3 */
            font-size: 0.875rem; /* text-sm */
            font-weight: 500; /* font-medium */
            color: white;
            text-align: center;
            text-decoration: none;
            cursor: pointer;
            outline: none;
          }
          .download-button:focus {
            outline: 2px solid #4f46e5; /* indigo-600 */
            outline-offset: 2px;
          }
          .download-button:active {
            color: #4338ca; /* indigo-500 */
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="cid:0123456789" alt="FendousAI logo" />
            <h1>Entreprise Plan Request</h1>
          </div>
          <div class="content">
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Business Name:</strong> ${business_name}</p>
            <p><strong>Contact Name:</strong> ${contact_name}</p>
            <p><strong>Contact Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
    
          <div class="footer">
            <p>&copy; 2024 Fendous Sustainable Solutions. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `,
    text: "FendousAI account registration",
  };

  await sendEmail(emailParams);
}
