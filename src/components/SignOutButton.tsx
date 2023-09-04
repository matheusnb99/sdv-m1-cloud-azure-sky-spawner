"use client";

import Button from "@/core/Button";
import { deleteCookie } from "@/lib/utils/deleteCookie";
import { useRouter } from "next/navigation";
import { FunctionComponent, useTransition } from "react";

interface SignOutButtonProps {}

const SignOutButton: FunctionComponent<SignOutButtonProps> = () => {
  const [isTransitionStarted, startTransition] = useTransition();
  const router = useRouter();

  return (
    <form
      action={() => {
        deleteCookie("account_jwt_token");
        startTransition(router.refresh);
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
};

export default SignOutButton;
