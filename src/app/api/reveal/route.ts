import { NextResponse } from "next/server";
import { findRecipient } from "@/lib/server-data";
import { parseLimitedJson, validateCodePayload } from "@/lib/validation";

const noStore = { "Cache-Control": "no-store, max-age=0" };

export async function POST(request: Request) {
  const declaredSize = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredSize) && declaredSize > 1024) {
    return NextResponse.json({ error: "Sol·licitud massa gran" }, { status: 413, headers: noStore });
  }

  let payload: unknown;
  try {
    payload = await parseLimitedJson(request);
  } catch (error) {
    const tooLarge = error instanceof Error && error.message === "BODY_TOO_LARGE";
    return NextResponse.json(
      { error: tooLarge ? "Sol·licitud massa gran" : "Sol·licitud no vàlida" },
      { status: tooLarge ? 413 : 400, headers: noStore },
    );
  }

  const code = validateCodePayload(payload);
  if (!code) {
    return NextResponse.json({ error: "Codi no vàlid" }, { status: 400, headers: noStore });
  }

  try {
    const recipient = findRecipient(code);
    if (!recipient) {
      return NextResponse.json({ error: "Codi incorrecte" }, { status: 401, headers: noStore });
    }
    return NextResponse.json({ recipient }, { headers: noStore });
  } catch {
    console.error("Reveal failed: server configuration or data error");
    return NextResponse.json(
      { error: "No s'ha pogut completar la consulta" },
      { status: 500, headers: noStore },
    );
  }
}
