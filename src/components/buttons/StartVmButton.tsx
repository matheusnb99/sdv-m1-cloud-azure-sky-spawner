"use client";
import Button from "@/core/Button";
import { startVmClient } from "@/lib/utils/startVmClient";
import { FunctionComponent, useState } from "react";

interface StartVmButtonProps {
  subscriptionId: string;
  token: string;
  resourceGroupName: string;
  virtualMachineName: string;
}

const StartVmButton: FunctionComponent<StartVmButtonProps> = ({
  subscriptionId,
  token,
  resourceGroupName,
  virtualMachineName,
}) => {
  const [message, setMessage] = useState<string>("Start");

  const onStart = async () => {
    startVmClient(token, subscriptionId, resourceGroupName, virtualMachineName);
  };

  return (
    <form action={onStart}>
      <Button
        type="submit"
        onClick={() => {
          setMessage("Starting");
        }}
        customClassName="mb-2 py-2 px-4 bg-blue-500 text-white rounded"
      >
        {message}
      </Button>
    </form>
  );
};

export default StartVmButton;
