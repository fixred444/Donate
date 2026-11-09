# ZeroTask — Prototype UI

Prototype website for a general digital-task platform (for example: surveys, app testing, data review, and other legitimate tasks). The visual layout follows the supplied mobile screenshots.

## Included in this prototype
- Login and registration screen UI.
- User dashboard, task list, submission history, wallet, and profile.
- Admin preview to create tasks, set year/instructions/reward rate, and review submissions.
- Submission statuses: Pending, Diproses, Success, Ditolak.
- Reward is added to the in-memory demo balance only when approved.
- No sample tasks are preloaded; the admin preview must create them.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to GitHub + Vercel
1. Upload the project to a GitHub repository.
2. Import that repository in Vercel.
3. Framework: Next.js. Build command: `npm run build`.

## Important before production
This is a **frontend prototype**, not a live multi-user service. Login/register currently runs only in browser state; Google login, password reset, persistent database, secure admin authorization, task ownership, submissions, and wallet ledger are not connected.

For production, connect Supabase:
- Supabase Auth for email/password and Google OAuth.
- `profiles` table with a server-controlled `role` (`user` or `admin`).
- `tasks` table for admin-created tasks.
- `submissions` table for user work and review status.
- `wallet_transactions` ledger; credit only from a server-side approval function / database transaction.
- Row Level Security (RLS) so users can only see their own submissions and balance, while admins can manage tasks and review all submissions.
- Never let a user choose their own admin role or trust a role stored only in localStorage/browser code.

This platform is intended for legitimate digital tasks. Do not use it to buy/sell accounts, collect passwords, OTPs, recovery codes, or other account credentials.
