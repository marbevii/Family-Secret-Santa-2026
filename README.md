# Secret Santa starter overlay

This archive contains files to **copy into the existing Next.js app root** (where `package.json` is). It does not replace `package.json`, `layout.tsx` or other generated files.

## Setup

1. Copy `src/`, `scripts/`, `private/participants.example.json`, and `.env.example` into your Next.js project. Merge the lines in `.gitignore.append` into the existing `.gitignore` (do not overwrite the original).
2. Create `private/participants.json` with participant IDs, names and exclusions (same format as example). **Keep this private.** The sample has only fictional participants. Use unique stable IDs, not necessarily names.
3. Run `node scripts/generate.mjs` **once**. It creates `private/codes.json` and `private/secret-santa-data.json`, both ignored by Git. It refuses to overwrite them.
4. Set `.env.local` to `SECRET_SANTA_DATA='...'`, where `...` is the JSON from `private/secret-santa-data.json` on a single line. Do not use `NEXT_PUBLIC_`.
5. Run `npm install server-only` and `npm run dev`, then test a code from `private/codes.json`.
6. In Vercel > Project > Settings > Environment Variables, add `SECRET_SANTA_DATA` (value is the raw JSON, no outer shell quotes) for Production, then redeploy. **Never commit private files**.

## Security notes

- This is a functional prototype, **not hardened for public traffic**. Before sharing publicly, add durable per-IP/per-code rate limiting (e.g. managed Redis/edge WAF) to `/api/reveal` and consider bot protection. In-memory counters do not work reliably across serverless instances.
- Codes are 128-bit random and stored as SHA-256 hashes; the server environment contains recipients, so keep Vercel access restricted.
- Keep `private/codes.json` secure; it contains access credentials. Don't paste its contents in chats or commit it.
- Changing assignment data changes the draw; never regenerate once participants have received codes. Back up private files securely.
- GitHub repository history is public. If secrets were ever committed, removing them from current files is not sufficient; rotate them.
- Test all constraints before distributing codes. A participant can use their code repeatedly; the assignment is fixed in Vercel env.
