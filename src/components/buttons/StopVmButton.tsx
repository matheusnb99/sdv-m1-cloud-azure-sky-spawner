"use client";

import Button from "@/core/Button";
import { stopVmClient } from "@/lib/utils/stopVmClient";
import { FunctionComponent, useState } from "react";

interface StopVmButtonProps {
  subscriptionId: string;
  token: string;
  resourceGroupName: string;
  virtualMachineName: string;
}

const StopVmButton: FunctionComponent<StopVmButtonProps> = ({
  subscriptionId,
  token,
  resourceGroupName,
  virtualMachineName,
}) => {
  const [message, setMessage] = useState<string>("Stop");

  const onDelete = async () => {
    stopVmClient(token, subscriptionId, resourceGroupName, virtualMachineName);
  };

  return (
    <form action={onDelete}>
      <Button
        type="submit"
        onClick={() => {
          setMessage("Stopping");
        }}
        customClassName="py-2 px-4 bg-blue-500 text-white rounded"
      >
        {message}
      </Button>
    </form>
  );
};

export default StopVmButton;
