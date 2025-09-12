## gm.bio

gm.bio is an on-chain link-in-bio built on Solana with an Anchor program and a Next.js app. Create and update a public profile and your links directly on-chain, then view them in a simple web UI. Use it as a reference for building profile-driven Solana dApps.

### Requirements
- Node.js 18+
- Rust + Cargo
- Solana CLI
- Anchor CLI

### Setup
```bash
# install root deps (workspace tools)
npm install

# install frontend deps
cd frontend && npm install
```

### Develop
```bash
# build and test the program (from project root)
anchor build && anchor test

# run the frontend (in another shell)
cd frontend && npm run dev
```

### Project Structure
- `programs/` Anchor program
- `frontend/` Next.js app
- `tests/` TS tests against the program

### Deploy
Configure provider and run `anchor deploy`.
