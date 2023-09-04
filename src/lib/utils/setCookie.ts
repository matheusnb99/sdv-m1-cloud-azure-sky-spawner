"use server";

import { User } from "@/lib/utils/db/User";
import { InteractiveBrowserCredential } from "@azure/identity";
import { cookies } from "next/headers";

type CookieProps = { name: "azure" } | ({ name: "account" } & PrimitiveUser);
type PrimitiveUser = {
  username: string;
  password: string;
};
// azure or account
// if accouunt, then get username and password

export async function setCookie(cookieArgs: CookieProps) {
  if (cookieArgs.name === "azure") {
    const cookieToken = cookies().get("azure_jwt_token");
    if (cookieToken) {
      return;
    }

    const credentials: InteractiveBrowserCredential = new InteractiveBrowserCredential({
      redirectUri: "http://localhost:1337",
    });

    const token = await credentials.getToken("https://management.azure.com/.default openid profile offline_access");

    cookies().set("azure_jwt_token", token.token, {
      expires: new Date(token.expiresOnTimestamp),
    });
  } else if (cookieArgs.name === "account") {
    const user = User.authenticate(cookieArgs.username, cookieArgs.password);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    cookies().set("account_jwt_token", user.username);
  }
  return true;
}
