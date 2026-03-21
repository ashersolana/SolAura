import { useState, useEffect, useRef } from "react";

const COMMANDS = [
  "What's my SOL balance?",
  "Show my token portfolio",
  "Send 0.5 SOL to 9x3...abc",
  "Explain my last transaction",
  "What tokens am I holding?",
  "Swap 10 USDC to SOL",
];

const RESPONSES = [
  "You have 4.521 SOL — worth $678.23 USD 💰",
  "Portfolio: 4.5 SOL, 120 USDC, 500 BONK 📊",
  "Ready to send 0.5 SOL. Confirm? ✅",
  "Last tx: Received 1.2 SOL from 7k2...xyz 🔍",
  "Holding: SOL, USDC, BONK, JUP 🪙",
  "Swapping 10 USDC → 0.067 SOL. Confirm? 🔄",
];

const FEATURES = [
  {
    icon: "◈",
    title: "Natural Language",
    desc: "Type commands in plain English. No more navigating complex interfaces.",
  },
  {
    icon: "⬡",
    title: "Any Solana Wallet",
    desc: "Phantom, Backpack, Solflare — connect any wallet instantly.",
  },
  {
    icon: "◉",
    title: "AI-Powered",
    desc: "Claude AI understands your intent and executes on-chain actions.",
  },
  {
    icon: "⬢",
    title: "Secure by Design",
    desc: "Private keys never touch the AI layer. Every action requires confirmation.",
  },
];

export default function SolAuraLanding() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayedCmd, setDisplayedCmd] = useState("");
  const [displayedRes, setDisplayedRes] = useState("");
  const [phase, setPhase] = useState("typing-cmd");
  const [connected, setConnected] = useState(false);
  const [glowPulse, setGlowPulse] = useState(false);
  const charRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowPulse((p) => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeout;
    const cmd = COMMANDS[msgIndex];
    const res = RESPONSES[msgIndex];

    if (phase === "typing-cmd") {
      if (charRef.current < cmd.length) {
        timeout = setTimeout(() => {
          setDisplayedCmd(cmd.slice(0, charRef.current + 1));
          charRef.current++;
        }, 45);
      } else {
        timeout = setTimeout(() => {
          charRef.current = 0;
          setPhase("typing-res");
        }, 500);
      }
    } else if (phase === "typing-res") {
      if (charRef.current < res.length) {
        timeout = setTimeout(() => {
          setDisplayedRes(res.slice(0, charRef.current + 1));
          charRef.current++;
        }, 30);
      } else {
        timeout = setTimeout(() => {
          charRef.current = 0;
          setPhase("clearing");
        }, 2000);
      }
    } else if (phase === "clearing") {
      timeout = setTimeout(() => {
        setDisplayedCmd("");
        setDisplayedRes("");
        setMsgIndex((i) => (i + 1) % COMMANDS.length);
        setPhase("typing-cmd");
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [phase, msgIndex, displayedCmd, displayedRes]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#060b18",
      color: "#e0f4ff",
      fontFamily: "'Courier New', 'Lucida Console', monospace",
      overflowX: "hidden",
      position: "relative",
    }}>
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{
        position: "fixed",
        top: "-200px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "800px",
        height: "500px",
        background: "radial-gradient(ellipse, rgba(0,180,255,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
        transition: "opacity 2s ease",
        opacity: glowPulse ? 1 : 0.5,
      }} />

      <nav style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 48px",
        borderBottom: "1px solid rgba(0,212,255,0.08)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#00d4ff",
            letterSpacing: "3px",
            textShadow: "0 0 20px rgba(0,212,255,0.6)",
          }}>SOLAURA</span>
          <span style={{
            fontSize: "18px",
            color: "#00d4ff",
            filter: "drop-shadow(0 0 6px rgba(0,212,255,0.8))",
          }}>✦</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["Docs", "GitHub", "Discord"].map((item) => (
            <a key={item} href="#" style={{
              color: "rgba(0,212,255,0.6)",
              textDecoration: "none",
              fontSize: "13px",
              letterSpacing: "2px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.color = "#00d4ff"}
            onMouseLeave={(e) => e.target.style.color = "rgba(0,212,255,0.6)"}
            >{item}</a>
          ))}
          <button
            onClick={() => setConnected(!connected)}
            style={{
              background: connected ? "rgba(0,212,255,0.1)" : "transparent",
              border: "1px solid rgba(0,212,255,0.4)",
              color: "#00d4ff",
              padding: "8px 20px",
              cursor: "pointer",
              fontSize: "12px",
              letterSpacing: "2px",
              transition: "all 0.2s",
              boxShadow: connected ? "0 0 20px rgba(0,212,255,0.2)" : "none",
            }}
          >
            {connected ? "◉ CONNECTED" : "CONNECT WALLET"}
          </button>
        </div>
      </nav>

      <section style={{
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        padding: "100px 48px 60px",
      }}>
        <div style={{
          display: "inline-block",
          border: "1px solid rgba(0,212,255,0.2)",
          padding: "6px 16px",
          marginBottom: "32px",
          fontSize: "11px",
          letterSpacing: "3px",
          color: "rgba(0,212,255,0.7)",
          background: "rgba(0,212,255,0.04)",
        }}>
          ◈ BUILT ON SOLANA · POWERED BY AI
        </div>

        <h1 style={{
          fontSize: "clamp(42px, 7vw, 80px)",
          fontWeight: "bold",
          lineHeight: 1.1,
          marginBottom: "24px",
          letterSpacing: "-1px",
        }}>
          <span style={{ color: "#e0f4ff" }}>YOUR SOLANA WALLET,</span>
          <br />
          <span style={{
            color: "#00d4ff",
            textShadow: "0 0 40px rgba(0,212,255,0.5)",
          }}>SPEAKS ENGLISH</span>
        </h1>

        <p style={{
          fontSize: "16px",
          color: "rgba(180,220,255,0.6)",
          maxWidth: "500px",
          margin: "0 auto 48px",
          lineHeight: 1.7,
          letterSpacing: "0.5px",
        }}>
          SolAura is an open-source AI agent that lets you manage your Solana wallet
          using natural language. No more complex interfaces.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            background: "linear-gradient(135deg, #00d4ff, #0099cc)",
            border: "none",
            color: "#060b18",
            padding: "14px 36px",
            fontSize: "13px",
            fontWeight: "bold",
            letterSpacing: "2px",
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 0 30px rgba(0,212,255,0.4)",
          }}>
            LAUNCH APP →
          </button>
          <button style={{
            background: "transparent",
            border: "1px solid rgba(0,212,255,0.3)",
            color: "rgba(0,212,255,0.8)",
            padding: "14px 36px",
            fontSize: "13px",
            letterSpacing: "2px",
            cursor: "pointer",
            fontFamily: "inherit",
          }}>
            VIEW GITHUB
          </button>
        </div>
      </section>

      <section style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "700px",
        margin: "0 auto 100px",
        padding: "0 24px",
      }}>
        <div style={{
          background: "rgba(6,11,24,0.9)",
          border: "1px solid rgba(0,212,255,0.2)",
          boxShadow: "0 0 60px rgba(0,212,255,0.1)",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            borderBottom: "1px solid rgba(0,212,255,0.1)",
          }}>
            {["#ff5f57","#febc2e","#28c840"].map((c) => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
            <span style={{
              marginLeft: "auto",
              fontSize: "11px",
              color: "rgba(0,212,255,0.4)",
              letterSpacing: "2px",
            }}>SOLAURA TERMINAL</span>
          </div>

          <div style={{ padding: "24px", minHeight: "160px" }}>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ color: "rgba(0,212,255,0.4)", fontSize: "12px" }}>wallet@solaura:~$ </span>
              <span style={{ color: "#e0f4ff", fontSize: "13px" }}>{displayedCmd}</span>
              {phase === "typing-cmd" && (
                <span style={{
                  display: "inline-block",
                  width: "8px",
                  height: "14px",
                  background: "#00d4ff",
                  marginLeft: "2px",
                  animation: "blink 1s infinite",
                  verticalAlign: "middle",
                }} />
              )}
            </div>

            {displayedRes && (
              <div style={{
                padding: "12px 16px",
                background: "rgba(0,212,255,0.04)",
                borderLeft: "2px solid rgba(0,212,255,0.4)",
                fontSize: "13px",
                color: "#00d4ff",
              }}>
                <span style={{ color: "rgba(0,212,255,0.5)", fontSize: "11px" }}>SOLAURA › </span>
                {displayedRes}
              </div>
            )}
          </div>
        </div>
        <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
      </section>

      <section style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "900px",
        margin: "0 auto 100px",
        padding: "0 24px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{
            fontSize: "11px",
            letterSpacing: "4px",
            color: "rgba(0,212,255,0.5)",
            marginBottom: "12px",
          }}>CAPABILITIES</p>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            color: "#e0f4ff",
          }}>Built for the next billion<br />Solana users</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1px",
          background: "rgba(0,212,255,0.1)",
          border: "1px solid rgba(0,212,255,0.1)",
        }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{
              background: "#060b18",
              padding: "32px 24px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,212,255,0.04)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#060b18"}
            >
              <div style={{
                fontSize: "24px",
                color: "#00d4ff",
                marginBottom: "16px",
              }}>{f.icon}</div>
              <h3 style={{
                fontSize: "13px",
                letterSpacing: "2px",
                color: "#e0f4ff",
                marginBottom: "10px",
              }}>{f.title.toUpperCase()}</h3>
              <p style={{
                fontSize: "13px",
                color: "rgba(180,220,255,0.5)",
                lineHeight: 1.6,
              }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        padding: "80px 48px 100px",
        borderTop: "1px solid rgba(0,212,255,0.08)",
      }}>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          marginBottom: "16px",
          color: "#e0f4ff",
        }}>Ready to try SolAura?</h2>
        <p style={{
          color: "rgba(180,220,255,0.5)",
          marginBottom: "40px",
          fontSize: "15px",
        }}>Connect your wallet and start managing with plain English.</p>
        <button style={{
          background: "linear-gradient(135deg, #00d4ff, #0099cc)",
          border: "none",
          color: "#060b18",
          padding: "16px 48px",
          fontSize: "14px",
          fontWeight: "bold",
          letterSpacing: "2px",
          cursor: "pointer",
          fontFamily: "inherit",
          boxShadow: "0 0 40px rgba(0,212,255,0.5)",
        }}>
          CONNECT WALLET →
        </button>
      </section>

      <footer style={{
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        padding: "24px",
        borderTop: "1px solid rgba(0,212,255,0.06)",
        fontSize: "12px",
        color: "rgba(0,212,255,0.3)",
        letterSpacing: "2px",
      }}>
        SOLAURA · OPEN SOURCE · MIT LICENSE · BUILT ON SOLANA
      </footer>
    </div>
  );
}
