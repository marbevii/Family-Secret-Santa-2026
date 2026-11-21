export const MAX_REQUEST_BYTES = 1024;
export const MAX_CODE_LENGTH = 80;
export const MIN_CODE_LENGTH = 16;

export function validateCodePayload(value: unknown): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const code = (value as Record<string, unknown>).code;
  if (typeof code !== "string") return null;
  const normalized = code.trim().toUpperCase();
  if (normalized.length < MIN_CODE_LENGTH || normalized.length > MAX_CODE_LENGTH) return null;
  if (!/^[A-Z0-9-]+$/.test(normalized)) return null;
  return normalized;
}

export async function parseLimitedJson(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("INVALID_BODY");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_REQUEST_BYTES) throw new Error("BODY_TOO_LARGE");
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const buffer = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(buffer));
  } catch {
    throw new Error("INVALID_BODY");
  }
}
