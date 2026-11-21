import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

type PrivateRecord = { codeHash: string; recipient: string };
type PrivateData = { records: PrivateRecord[] };

function readData(): PrivateData {
  const raw = process.env.SECRET_SANTA_DATA;
  if (!raw) throw new Error("SECRET_SANTA_DATA is not configured");
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || !("records" in parsed) || !Array.isArray(parsed.records)) throw new Error("Invalid private data");
  const records = parsed.records as unknown[];
  if (!records.length || !records.every((r) => !!r && typeof r === "object" && "codeHash" in r && "recipient" in r && typeof r.codeHash === "string" && /^[a-f0-9]{64}$/.test(r.codeHash) && typeof r.recipient === "string" && r.recipient.length > 0)) throw new Error("Invalid private records");
  return { records: records as PrivateRecord[] };
}

export function findRecipient(code: string): string | null {
  const hash = createHash("sha256").update(code.trim().toUpperCase()).digest();
  let result: string | null = null;
  for (const record of readData().records) {
    const stored = Buffer.from(record.codeHash, "hex");
    if (timingSafeEqual(hash, stored)) result = record.recipient;
  }
  return result;
}
