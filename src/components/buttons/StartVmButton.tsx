"use client";
import Button from "@/core/Button";
import { startVmClient } from "@/lib/utils/startVmClient";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState, useTransition } from "react";

interface StartVmButtonProps {
  subscriptionId: string;
  token: string;
  resourceGroupName: string;
  virtualMachineName: string;
}
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const StartVmButton: FunctionComponent<StartVmButtonProps> = ({
  subscriptionId,
  token,
  resourceGroupName,
  virtualMachineName,
}) => {
  const [message, setMessage] = useState<string>("Start");
  const [isTransitionStarted, startTransition] = useTransition();
  const router = useRouter();

  const onStart = async () => {
    setMessage("Starting... reload after 10 seconds");
    startVmClient(token, subscriptionId, resourceGroupName, virtualMachineName);
  };

  return (
    <form action={onStart}>
      <Button type="submit" customClassName="mb-2 py-2 px-4 bg-blue-500 text-white rounded">
        {message}
      </Button>
    </form>
  );
};

export default StartVmButton;
