"use client";

import Button from "@/core/Button";
import { deleteVmClient } from "@/lib/utils/deleteVmClient";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState, useTransition } from "react";

interface DeleteVmButtonProps {
  subscriptionId: string;
  token: string;
  resourceGroupName: string;
  virtualMachineName: string;
}

const DeleteVmButton: FunctionComponent<DeleteVmButtonProps> = ({
  subscriptionId,
  token,
  resourceGroupName,
  virtualMachineName,
}) => {
  const [message, setMessage] = useState<string>("Delete");
  const [isTransitionStarted, startTransition] = useTransition();
  const router = useRouter();

  const onDelete = async () => {
    setMessage("Deleting... reload after 10 seconds");
    deleteVmClient(token, subscriptionId, resourceGroupName, virtualMachineName);

    // await sleep(10000).then(() => {
    //   startTransition(router.refresh);
    // });
  };

  return (
    <form action={onDelete}>
      <Button type="submit" customClassName="py-2 px-4 bg-red-500 text-white rounded">
        {message}
      </Button>
    </form>
  );
};

export default DeleteVmButton;
