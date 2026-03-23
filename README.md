# SolAura ✨

> AI-powered Solana wallet assistant — manage your wallet with plain English.

## What is SolAura?

SolAura is an open-source AI agent that connects to your Solana wallet and lets you manage it using natural language. No more navigating complex DeFi interfaces just type what you want and SolAura does it.

## The Problem

Solana has incredible speed and near zero fees, but the user experience is still too complex for most people. Connecting wallets, reading balances, sending tokens, and executing transactions requires technical knowledge that blocks mainstream adoption.

## The Solution

SolAura bridges the gap between AI and Solana. Connect your Solana wallet, type a command in plain English, and SolAura handles the rest.

## Features (Roadmap)

- 💬 Natural language chat interface
- 👛 Connect any Solana wallet
- 📊 Real-time portfolio viewer
- 💸 Send SOL and SPL tokens via chat
- 🔍 Transaction history in plain English
- 🤖 AI-powered insights on your portfolio

## Tech Stack

- React + Tailwind CSS
- @solana/web3.js
- @solana/wallet-adapter
- AI Language Model API
- Solana Mainnet

## Why Solana?

AI micro-transactions require near-zero fees and instant finality. Solana is the only chain where this is practical at scale  making SolAura only possible on Solana.



## Security

- 🔒 Private keys never touch the AI layer
- ✅ All wallet actions require explicit user confirmation
- 🛡️ Bounded permissions prevent prompt injection attacks
- 👁️ LLM only reads public wallet data never private keys
- ⚠️ Every transaction shows a confirmation screen before signing





## Getting Started

Clone the repository:
```bash
git clone https://github.com/ashersolana/solaura
```

Install dependencies:
```bash
npm install
```

Run locally:
```bash
npm run dev
```

## Architecture

```
User → Chat Interface → AI Parser → Solana Action Layer → Wallet Transaction
```

1. User sends a command
2. AI interprets the intent
3. SolAura maps intent to a Solana action
4. Transaction is prepared and sent via wallet adapter

## Example Commands

- 💬 *"What's my SOL balance?"*
- 💸 *"Send 0.2 SOL to 9x3...abc"*
- 📊 *"Show my token portfolio"*
- 🔍 *"Explain my last transaction"*

## Roadmap

### Phase 1  Core AI Wallet Interface
- Build natural language chat interface
- Connect Solana wallets via wallet adapter
- Implement AI intent parser for wallet actions

### Phase 2  Transaction Execution
- Enable sending SOL and SPL tokens via chat
- Add transaction confirmation flow
- Implement safety checks before execution

### Phase 3  Portfolio Intelligence
- Real-time portfolio viewer
- Natural language transaction history explanations
- AI-generated portfolio insights

### Phase 4  Open Source Developer Toolkit
- Documentation for developers
- Modular AI action framework
- Allow developers to build their own wallet AI agents

## Status

🚧 Currently in development

## Open Source

SolAura is fully open source. Developers can fork and build their own AI wallet agents on top of this codebase.

## Contact

Built by [@ashersolana](https://github.com/ashersolana)
X: [@Elitecryptolord](https://x.com/Elitecryptolord)
