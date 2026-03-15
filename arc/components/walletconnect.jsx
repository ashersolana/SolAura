
import { useState } from "react";

const WalletConnect = ({ onConnect }) => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      setLoading(true);
      const { solana } = window;
      if (solana && solana.isPhantom) {
        const response = await solana.connect();
        const walletAddress = response.publicKey.toString();
        setAddress(walletAddress);
        onConnect(walletAddress);
      } else {
        alert("Please install Phantom wallet!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-connect">
      {!address ? (
        <button onClick={connectWallet} disabled={loading}>
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div>
          <p>✅ Connected</p>
          <p>{address.slice(0, 4)}...{address.slice(-4)}</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
