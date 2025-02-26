import { getAuthUrl } from "@/lib/integrations/google";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { scope } = await req.json();
  console.log("SCOPE:", scope);
  return NextResponse.json({ error: "Scope is test" }, { status: 400 });

  if (!scope) {
    return NextResponse.json({ error: "Scope is required" }, { status: 400 });
  }
  const url = await getAuthUrl(scope);

  return NextResponse.json({ url: url }, { status: 200 });
}
