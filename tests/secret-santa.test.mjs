
import test from "node:test";
import assert from "node:assert/strict";
import { draw } from "../src/lib/secret-santa.ts";

const participants = [
  { id: "a", name: "Person A", excludedRecipientIds: ["b"] },
  { id: "b", name: "Person B", excludedRecipientIds: [] },
  { id: "c", name: "Person C", excludedRecipientIds: [] },
  { id: "d", name: "Person D", excludedRecipientIds: [] },
];

const random = () => 0;

test("Every participant gives exactly one gift", () => {
  const result = draw(participants, random);

  assert.equal(Object.keys(result).length, participants.length);
});

test("Every participant receives exactly one gift", () => {
  const result = draw(participants, random);
  const recipients = Object.values(result);

  assert.equal(new Set(recipients).size, participants.length);
  assert.deepEqual(
    [...recipients].sort(),
    participants.map((p) => p.id).sort()
  );
});

test("Nobody is assigned to themselves", () => {
  const result = draw(participants, random);

  for (const [giver, recipient] of Object.entries(result)) {
    assert.notEqual(giver, recipient);
  }
});

test("All exclusions are respected", () => {
  const result = draw(participants, random);

  for (const person of participants) {
    assert.ok(
      !person.excludedRecipientIds.includes(result[person.id])
    );
  }
});

test("Duplicate participant IDs are rejected", () => {
  const invalid = [...participants, participants[0]];

  assert.throws(() => draw(invalid, random));
});

test("Impossible assignments are rejected", () => {
  const impossible = [
    { id: "a", name: "A", excludedRecipientIds: ["b"] },
    { id: "b", name: "B", excludedRecipientIds: [] },
  ];

  assert.throws(() => draw(impossible, random));
});

test("Same random input produces the same assignment", () => {
  const first = draw(participants, random);
  const second = draw(participants, random);

  assert.deepEqual(first, second);
});
