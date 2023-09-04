"use client";

import Button from "@/core/Button";
import { stopVmClient } from "@/lib/utils/stopVmClient";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState, useTransition } from "react";

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
  const [isTransitionStarted, startTransition] = useTransition();
  const router = useRouter();

  const onDelete = async () => {
    setMessage("Stopping... reload after 10 seconds");
    stopVmClient(token, subscriptionId, resourceGroupName, virtualMachineName);

    // await sleep(10000).then(() => {
    //   startTransition(router.refresh);
    // });
  };

  return (
    <form action={onDelete}>
      <Button type="submit" customClassName="py-2 px-4 bg-blue-500 text-white rounded">
        {message}
      </Button>
    </form>
  );
};

export default StopVmButton;
