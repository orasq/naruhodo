import * as React from "react";

interface ResetPasswordEmailTemplateProps {
  token: string;
}

export const ResetPasswordEmailTemplate = ({
  token,
}: ResetPasswordEmailTemplateProps) => (
  <div>
    <h1>Reset your password</h1>
    <p>Looks like you lost your password. </p>
    <p>
      Click on the button below to change your password:{" "}
      {`${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${token}`}
    </p>
    <p>If you didn't ask to reset your password, please ignore this email.</p>
  </div>
);
