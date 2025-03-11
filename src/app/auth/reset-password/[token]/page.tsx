import { ResetPasswordForm } from "@/components/Form/ResetPasswordForm";

type ResetPasswordProps = {
  params: Promise<{
    token: string;
  }>;
};

async function ResetPassword(props: ResetPasswordProps) {
  const params = await props.params;
  return (
    <section className="flex justify-center">
      <div className="bg-surface-base relative w-full max-w-80 overflow-hidden rounded-xl px-8 py-7 text-center shadow-sm">
        <h1 className="mb-2 text-xl font-semibold">Change your password</h1>
        <p className="mb-6 text-sm">Enter your new password below.</p>

        <ResetPasswordForm token={params.token} />
      </div>
    </section>
  );
}

export default ResetPassword;
