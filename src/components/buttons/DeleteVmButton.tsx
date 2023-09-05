"use client";

import Button from "@/core/Button";
import { deleteVmClient } from "@/lib/utils/deleteVmClient";
import { FunctionComponent, useState } from "react";

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

  const onDelete = async () => {
    deleteVmClient(token, subscriptionId, resourceGroupName, virtualMachineName);
  };

  return (
    <form action={onDelete}>
      <Button
        type="submit"
        onClick={() => {
          setMessage("Deleting");
        }}
        customClassName="py-2 px-4 bg-red-500 text-white rounded"
      >
        {message}
      </Button>
    </form>
  );
};

export default DeleteVmButton;
