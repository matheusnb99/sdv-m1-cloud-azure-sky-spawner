"use client";

import Button from "@/core/Button";
import { FunctionComponent } from "react";

interface ServerActionButtonProps {
  action: () => void;
  label: string;
}

const ServerActionButton: FunctionComponent<ServerActionButtonProps> = ({ action, label }) => {
  return (
    <form action={action}>
      <Button type="submit">{label}</Button>
    </form>
  );
};

export default ServerActionButton;
