import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        await solana.connect();
        setConnected(true);
      } else {
        alert("Please install Phantom wallet!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="app">
      <h1>SolAura 🌟</h1>
      <p>AI-powered Solana wallet assistant</p>
      {!connected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>✅ Wallet Connected</p>
      )}
      <div className="chat">
        {messages.map((msg, i) => (
          <div key={i}>{msg.text}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Try: "What is my balance?"'
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
