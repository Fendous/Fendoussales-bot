import React from "react";

const PasswordResetTemplate = ({
  userName,
  resetLink,
}: {
  userName: string;
  resetLink: string;
}) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
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
              background-color: #007BFF;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s ease;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 0.9em;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="cid:0123456789" alt="FendousAI logo"/>
                <h1>Password Reset Request</h1>
            </div>
            <div class="content">
                <p>Hi ${userName},</p>
                <p>We received a request to reset your password for your FendousAI account. Click the link below to reset it:</p>
                <a href=${resetLink} class="button">Reset Password</a>
                <p>If you did not request a password reset, please ignore this email or contact our support team if you have any questions.</p>
                <p>Thanks,<br>The FendousAI Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Fendous Sustainable Solutions. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;
};

export default PasswordResetTemplate;
