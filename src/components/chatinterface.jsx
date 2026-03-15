mport { useState } from "react";

const ChatInterface = ({ walletAddress }) => {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm SolAura 🌟 Your AI Solana wallet assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // AI response will be integrated here
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        text: `Processing your request: "${input}". AI integration coming soon!`
      }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="chat-interface">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <span>{msg.role === "assistant" ? "🌟" : "👤"}</span>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <p>SolAura is thinking... 🤔</p>}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder='Try: "What is my SOL balance?"'
          disabled={!walletAddress}
        />
        <button onClick={sendMessage} disabled={!walletAddress || loading}>
          Send
        </button>
      </div>
      {!walletAddress && <p>⚠️ Please connect your wallet first</p>}
    </div>
  );
};
