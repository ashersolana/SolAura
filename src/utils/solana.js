// SolAura Solana Utility
// Handles all Solana blockchain interactions

import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

// Connect to Solana mainnet
const connection = new Connection(
  process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com",
  "confirmed"
);

// Get SOL balance
const getBalance = async (walletAddress) => {
  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return (balance / LAMPORTS_PER_SOL).toFixed(4);
  } catch (err) {
    console.error("Error fetching balance:", err);
    return null;
  }
};

// Get recent transactions
const getTransactions = async (walletAddress) => {
  try {
    const publicKey = new PublicKey(walletAddress);
    const transactions = await connection.getSignaturesForAddress(publicKey, {
      limit: 10
    });
    return transactions;
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return [];
  }
};

// Get token accounts
const getTokenAccounts = async (walletAddress) => {
  try {
    const publicKey = new PublicKey(walletAddress);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") }
    );
    return tokenAccounts.value;
  } catch (err) {
    console.error("Error fetching tokens:", err);
    return [];
  }
};

export { getBalance, getTransactions, getTokenAccounts };
