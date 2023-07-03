import { InteractiveBrowserCredential } from "@azure/identity";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const credentials = new InteractiveBrowserCredential();

  return NextResponse.json({ credentials: credentials });
}
