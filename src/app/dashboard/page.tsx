"use client";

import { logUserOut } from "@/actions/users/logUser";
import { Button } from "@/components/Button";
import { startTransition, useActionState } from "react";

function Dashboard() {
  const [_, submitAction, isLoading] = useActionState(logUserOut, undefined);

  const handleButtonClick = () => {
    startTransition(() => submitAction());
  };

  return (
    <section className="flex flex-col items-center text-center">
      <h1 className="mb-3 text-3xl font-semibold">Coming soon</h1>
      <p className="mb-10">Nothing to see here...</p>

      <Button onClick={handleButtonClick} isLoading={isLoading}>
        Log out
      </Button>
    </section>
  );
}

export default Dashboard;
