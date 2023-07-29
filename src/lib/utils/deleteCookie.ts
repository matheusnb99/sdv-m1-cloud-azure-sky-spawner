"use server";

import { cookies } from "next/headers";

export async function deleteCookie(cookieName: "account_jwt_token" | "account_jwt_token") {
  cookies().delete(cookieName);
}
