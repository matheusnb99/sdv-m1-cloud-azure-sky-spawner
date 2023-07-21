import { InteractiveBrowserCredential } from "@azure/identity";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const credentials: InteractiveBrowserCredential = new InteractiveBrowserCredential({
    redirectUri: "http://localhost:1337",
  });

  const token = await credentials.getToken("https://management.azure.com/.default openid profile offline_access");

  return NextResponse.json({ token });
}
