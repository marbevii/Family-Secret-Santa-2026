import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { randomBytes, randomInt, createHash } from "node:crypto";
import { resolve } from "node:path";

const input = resolve("private/participants.json");
const output = resolve("private/secret-santa-data.json");
const codesFile = resolve("private/codes.json");
if (!existsSync(input)) throw new Error("Create private/participants.json from private/participants.example.json");
if (existsSync(output) || existsSync(codesFile)) throw new Error("Private output already exists; refusing to overwrite existing assignments/codes");
const people = JSON.parse(readFileSync(input, "utf8"));
if (!Array.isArray(people) || people.length < 2) throw new Error("At least 2 participants required");
const ids = people.map((p) => p.id);
if (ids.some((id) => typeof id !== "string" || !id) || new Set(ids).size !== ids.length) throw new Error("IDs must be nonempty and unique");
const allIds = new Set(ids);
for (const p of people) {
  if (typeof p.name !== "string" || !p.name || !Array.isArray(p.excludedRecipientIds) || p.excludedRecipientIds.some((id) => !allIds.has(id))) throw new Error("Invalid participants or exclusions");
}
const choices = new Map(people.map((p) => [p.id, ids.filter((id) => id !== p.id && !p.excludedRecipientIds.includes(id))]));
const order = [...ids].sort((a, b) => choices.get(a).length - choices.get(b).length);
const assignment = {};
const used = new Set();
function solve(i) {
  if (i === order.length) return true;
  const giver = order[i];
  const options = choices.get(giver).filter((id) => !used.has(id));
  for (let k = options.length - 1; k > 0; k--) { const j = randomInt(k + 1); [options[k], options[j]] = [options[j], options[k]]; }
  for (const recipient of options) {
    used.add(recipient); assignment[giver] = recipient;
    if (order.slice(i + 1).every((id) => choices.get(id).some((r) => !used.has(r))) && solve(i + 1)) return true;
    used.delete(recipient); delete assignment[giver];
  }
  return false;
}
if (!solve(0)) throw new Error("No valid assignment exists");
const names = new Map(people.map((p) => [p.id, p.name]));
const codes = people.map((p) => ({ name: p.name, code: randomBytes(16).toString("hex").toUpperCase() }));
const records = people.map((p, i) => ({ codeHash: createHash("sha256").update(codes[i].code).digest("hex"), recipient: names.get(assignment[p.id]) }));
mkdirSync(resolve("private"), { recursive: true });
writeFileSync(output, JSON.stringify({ records }, null, 2), { mode: 0o600, flag: "wx" });
writeFileSync(codesFile, JSON.stringify(codes, null, 2), { mode: 0o600, flag: "wx" });
console.log(`Generated ${people.length} valid assignments. Private files: private/secret-santa-data.json and private/codes.json`);
console.log("Do not commit or share these files. Set SECRET_SANTA_DATA to the minified JSON contents of secret-santa-data.json in .env.local and Vercel.");
