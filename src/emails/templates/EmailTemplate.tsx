import * as React from "react";

interface EmailTemplateProps {
  emailAddress: string;
  token: string;
}

export const EmailTemplate = ({ emailAddress, token }: EmailTemplateProps) => (
  <div>
    <p>
      Please activate your account by clicking this link:{" "}
      {`${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm/${token}`}
    </p>
  </div>
);
