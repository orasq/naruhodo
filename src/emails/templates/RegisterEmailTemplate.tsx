import * as React from "react";

interface RegisterEmailTemplateProps {
  token: string;
}

export const RegisterEmailTemplate = ({
  token,
}: RegisterEmailTemplateProps) => (
  <div>
    <p>
      Please activate your account by clicking this link:{" "}
      {`${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm/${token}`}
    </p>
  </div>
);
