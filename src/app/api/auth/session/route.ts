import { NextResponse, type NextRequest } from "next/server";
import { noStoreHeaders } from "@/lib/security";
import { getUserFromRequest } from "@/lib/session";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request);

  if (!user) {
    return NextResponse.json(
      { error: "Sessão inválida ou expirada." },
      { status: 401, headers: noStoreHeaders() },
    );
  }

  return NextResponse.json({ user }, { headers: noStoreHeaders() });
}
