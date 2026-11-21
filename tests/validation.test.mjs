import test from "node:test";
import assert from "node:assert/strict";
import { validateCodePayload, parseLimitedJson } from "../src/lib/validation.ts";

test("normalizes valid codes", () => {
  assert.equal(validateCodePayload({ code: "  abcd-1234-efgh-5678  " }), "ABCD-1234-EFGH-5678");
});
test("rejects malformed and short codes", () => {
  for (const value of [null, [], {}, { code: 123 }, { code: "abc" }, { code: "a".repeat(81) }, { code: "A".repeat(16) + "!" }]) {
    assert.equal(validateCodePayload(value), null);
  }
});
test("accepts a small JSON request", async () => {
  const request = new Request("http://localhost/api/reveal", { method: "POST", body: JSON.stringify({ code: "ABCD-1234-EFGH-5678" }) });
  assert.deepEqual(await parseLimitedJson(request), { code: "ABCD-1234-EFGH-5678" });
});
test("rejects oversized bodies even without Content-Length", async () => {
  const request = new Request("http://localhost/api/reveal", { method: "POST", body: JSON.stringify({ code: "A".repeat(2000) }) });
  await assert.rejects(() => parseLimitedJson(request), /BODY_TOO_LARGE/);
});
test("rejects invalid JSON", async () => {
  const request = new Request("http://localhost/api/reveal", { method: "POST", body: "{oops" });
  await assert.rejects(() => parseLimitedJson(request), /INVALID_BODY/);
});
