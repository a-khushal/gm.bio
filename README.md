## gm.bio

Minimal workspace with a Solana Anchor program and a Next.js frontend.

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
