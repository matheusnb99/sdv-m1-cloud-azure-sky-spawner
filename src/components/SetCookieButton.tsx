"use client";

import Button from "@/core/Button";
import { setCookie } from "@/lib/utils/setCookie";
import { redirect } from "next/navigation";
import { FunctionComponent } from "react";

interface SetCookieButtonProps {}

const SetCookieButton: FunctionComponent<SetCookieButtonProps> = () => {
  return (
    <form
      action={() => {
        setCookie({ name: "azure" });
        redirect("/app");
      }}
    >
      <Button type="submit">Get Started</Button>
    </form>
  );
};

export default SetCookieButton;
