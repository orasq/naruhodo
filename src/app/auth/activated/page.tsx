import { IconCircleCheckFilled } from "@tabler/icons-react";

function Activated() {
  return (
    <section className="flex h-full items-center justify-center">
      <div className="bg-surface-base relative flex gap-5 rounded-xl px-7 py-6">
        <IconCircleCheckFilled size={50} className="text-success" />
        <div>
          <h1 className="text-lg font-semibold">
            Your account has been successfully activated!
          </h1>
          <p>You can now log in to your account.</p>
        </div>
      </div>
    </section>
  );
}

export default Activated;
