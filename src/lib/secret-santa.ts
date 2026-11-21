export type Participant = { id: string; name: string; excludedRecipientIds: string[] };
export type Assignment = Record<string, string>;

/** Randomized backtracking produces a one-to-one assignment respecting all exclusions. */
export function draw(participants: Participant[], random: (max: number) => number): Assignment {
  const ids = participants.map((p) => p.id);
  if (new Set(ids).size !== ids.length || !ids.length) throw new Error("Participant IDs must be unique and nonempty");
  const idSet = new Set(ids);
  for (const p of participants) {
    if (!p.id || !p.name || p.excludedRecipientIds.some((id) => !idSet.has(id))) throw new Error("Invalid participant configuration");
  }
  const choices = new Map(participants.map((p) => [p.id, ids.filter((id) => id !== p.id && !p.excludedRecipientIds.includes(id))]));
  const order = [...ids].sort((a, b) => choices.get(a)!.length - choices.get(b)!.length);
  const used = new Set<string>();
  const assignment: Assignment = {};
  function solve(index: number): boolean {
    if (index === order.length) return true;
    const giver = order[index];
    const available = choices.get(giver)!.filter((id) => !used.has(id));
    for (let i = available.length - 1; i > 0; i--) {
      const j = random(i + 1);
      [available[i], available[j]] = [available[j], available[i]];
    }
    for (const recipient of available) {
      assignment[giver] = recipient;
      used.add(recipient);
      if (order.slice(index + 1).every((other) => choices.get(other)!.some((id) => !used.has(id))) && solve(index + 1)) return true;
      used.delete(recipient);
      delete assignment[giver];
    }
    return false;
  }
  if (!solve(0)) throw new Error("No valid assignment exists for these restrictions");
  return assignment;
}
