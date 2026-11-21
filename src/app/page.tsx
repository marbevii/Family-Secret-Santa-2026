"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [recipient, setRecipient] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function reveal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setRecipient(null);
    setError("");
    try {
      const response = await fetch("/api/reveal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }), cache: "no-store" });
      const result: { recipient?: string; error?: string } = await response.json();
      if (!response.ok || !result.recipient) throw new Error(result.error ?? "Error inesperat");
      setRecipient(result.recipient);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperat");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-900">
      <section className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm space-y-6">
        <h1 className="text-2xl font-bold">🎁 Amic Invisible</h1>
        <p>Introdueix el teu codi privat per descobrir a qui has de fer el regal.</p>
        <form onSubmit={reveal} className="space-y-4">
          <label htmlFor="code" className="block font-medium">El teu codi</label>
          <input id="code" type="password" autoComplete="off" required value={code} onChange={(e) => setCode(e.target.value)} className="w-full rounded-md border p-3" />
          <button type="submit" disabled={loading} className="w-full rounded-md bg-slate-900 text-white p-3 disabled:opacity-50">{loading ? "Consultant..." : "Descobreix el teu amic invisible"}</button>
        </form>
        {error && <p role="alert" className="text-red-700">{error}</p>}
        {recipient && <div role="status" className="rounded-md bg-green-50 p-4"><p>Has de fer el regal a:</p><p className="text-xl font-bold">{recipient}</p></div>}
        {recipient && <button onClick={() => { setRecipient(null); setCode(""); }} className="underline">Amaga el resultat</button>}
      </section>
    </main>
  );
}
