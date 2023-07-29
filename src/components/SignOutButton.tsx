"use client";

import Button from "@/core/Button";
import { deleteCookie } from "@/lib/utils/deleteCookie";
import { FunctionComponent } from "react";

interface SignOutButtonProps {}

const SignOutButton: FunctionComponent<SignOutButtonProps> = () => {
  return (
    <form
      action={() => {
        deleteCookie("account_jwt_token");
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
};

export default SignOutButton;
