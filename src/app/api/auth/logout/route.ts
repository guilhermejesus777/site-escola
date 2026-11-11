import { NextResponse, type NextRequest } from "next/server";
import { noStoreHeaders, requireSameOrigin } from "@/lib/security";
import { clearSessionCookie } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const invalidRequest = requireSameOrigin(request);
  if (invalidRequest) return invalidRequest;

  return NextResponse.json(
    { ok: true },
    {
      headers: {
        ...noStoreHeaders(),
        "Set-Cookie": clearSessionCookie(),
      },
    },
  );
}
