// SolAura Intent Parser
// Understands natural language commands and maps them to Solana actions

const INTENTS = {
  CHECK_BALANCE: "check_balance",
  SEND_SOL: "send_sol",
  SHOW_PORTFOLIO: "show_portfolio",
  TRANSACTION_HISTORY: "transaction_history",
  TOKEN_PRICE: "token_price",
  UNKNOWN: "unknown"
};

const parseIntent = (input) => {
  const text = input.toLowerCase().trim();

  // Check balance
  if (text.includes("balance") || text.includes("how much") || text.includes("how many sol")) {
    return { intent: INTENTS.CHECK_BALANCE };
  }

  // Send SOL
  if (text.includes("send") || text.includes("transfer")) {
    const amountMatch = text.match(/(\d+\.?\d*)\s*sol/);
    const addressMatch = text.match(/to\s+([A-Za-z0-9]{32,44})/);
    return {
      intent: INTENTS.SEND_SOL,
      amount: amountMatch ? parseFloat(amountMatch[1]) : null,
      address: addressMatch ? addressMatch[1] : null
    };
  }

  // Show portfolio
  if (text.includes("portfolio") || text.includes("tokens") || text.includes("holdings")) {
    return { intent: INTENTS.SHOW_PORTFOLIO };
  }

  // Transaction history
  if (text.includes("history") || text.includes("transactions") || text.includes("recent")) {
    return { intent: INTENTS.TRANSACTION_HISTORY };
  }

  // Token price
  if (text.includes("price") || text.includes("worth") || text.includes("value")) {
    return { intent: INTENTS.TOKEN_PRICE };
  }

  return { intent: INTENTS.UNKNOWN };
};
