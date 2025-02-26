import * as React from "react";

interface EmailTemplateProps {
  resetlink: string;
}

export const PasswordResetEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ resetlink }) => (
  <div>
    <h1>Password reset link: {resetlink}</h1>
  </div>
);

export default PasswordResetEmailTemplate;
