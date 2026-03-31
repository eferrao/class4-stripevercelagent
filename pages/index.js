import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [chargeCount, setChargeCount] = useState(0);
  const [liveUrl, setLiveUrl] = useState("");

  useEffect(() => {
    setLiveUrl(window.location.origin);
    let i = 0;
    const target = 42;
    const timer = setInterval(() => {
      i += 1;
      setChargeCount(i);
      if (i >= target) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const [copied, setCopied] = useState(null);
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <Head>
        <title>Agent Toll Booth</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anybody:wght@400;700;900&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: #06060a;
          color: #c8cad0;
          font-family: 'DM Mono', monospace;
          overflow-x: hidden;
        }
        .bg-grid {
          position: fixed;
          inset: 0;
          z-index: 0;
          background-image:
            linear-gradient(rgba(74, 222, 128, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 222, 128, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridDrift 20s linear infinite;
        }
        @keyframes gridDrift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        .bg-glow {
          position: fixed;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(74,222,128,0.08) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
        }
        .scanlines {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
        }
        .page {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gate {
          width: 100%;
          padding: 3rem 2rem 2rem;
          text-align: center;
          position: relative;
        }
        .gate::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 10%;
          right: 10%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.4), transparent);
        }
        .toll-sign {
          display: inline-block;
          border: 2px solid rgba(74,222,128,0.3);
          border-radius: 16px;
          padding: 0.6rem 1.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(74,222,128,0.7);
          animation: signPulse 3s ease-in-out infinite;
        }
        @keyframes signPulse {
          0%, 100% { border-color: rgba(74,222,128,0.3); box-shadow: 0 0 20px rgba(74,222,128,0.05); }
          50% { border-color: rgba(74,222,128,0.6); box-shadow: 0 0 30px rgba(74,222,128,0.1); }
        }
        .title {
          font-family: 'Anybody', sans-serif;
          font-weight: 900;
          font-size: clamp(3rem, 8vw, 5.5rem);
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 1rem;
          background: linear-gradient(180deg, #ffffff 0%, #4ade80 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tagline {
          font-size: 1.05rem;
          color: #666;
          max-width: 460px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }
        .tagline strong { color: #4ade80; }
        .price-display {
          display: inline-flex;
          align-items: baseline;
          gap: 0.2rem;
          margin-bottom: 2rem;
        }
        .price-dollar {
          font-family: 'Anybody', sans-serif;
          font-weight: 900;
          font-size: 4rem;
          color: #fff;
          line-height: 1;
        }
        .price-label {
          font-size: 0.75rem;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-left: 0.5rem;
        }
        .content {
          width: 100%;
          max-width: 640px;
          padding: 0 1.5rem 4rem;
        }
        .stats-bar {
          display: flex;
          gap: 1px;
          margin: 2.5rem 0 1rem;
          background: #111;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #1a1a1a;
        }
        .stat {
          flex: 1;
          padding: 1.1rem 1rem;
          text-align: center;
          background: #0c0c10;
          transition: background 0.2s;
        }
        .stat:hover { background: #0f0f15; }
        .stat-value {
          font-family: 'Anybody', sans-serif;
          font-weight: 700;
          font-size: 1.4rem;
          color: #fff;
          display: block;
        }
        .stat-label {
          font-size: 0.65rem;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 0.2rem;
        }
        .flow-section { margin: 2.5rem 0; }
        .flow-title {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #4ade80;
          margin-bottom: 1.25rem;
        }
        .flow-steps {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .flow-step {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem 0;
          border-left: 2px solid #1a1a1a;
          padding-left: 1.5rem;
          position: relative;
          transition: border-color 0.3s;
        }
        .flow-step:hover { border-left-color: rgba(74,222,128,0.3); }
        .flow-step::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 1.2rem;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 2px solid #333;
          transition: all 0.3s;
        }
        .flow-step:hover::before {
          background: #4ade80;
          border-color: #4ade80;
          box-shadow: 0 0 12px rgba(74,222,128,0.4);
        }
        .flow-num {
          font-family: 'Anybody', sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          color: #222;
          min-width: 2rem;
        }
        .flow-step:hover .flow-num { color: #4ade80; }
        .flow-text {
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .flow-text strong { color: #e0e0e0; }
        .flow-result {
          display: inline-block;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          margin-top: 0.25rem;
        }
        .result-reject {
          background: rgba(239,68,68,0.15);
          color: #ef4444;
          border: 1px solid rgba(239,68,68,0.2);
        }
        .result-pay {
          background: rgba(99,91,255,0.15);
          color: #a5b4fc;
          border: 1px solid rgba(99,91,255,0.2);
        }
        .result-success {
          background: rgba(74,222,128,0.15);
          color: #4ade80;
          border: 1px solid rgba(74,222,128,0.2);
        }
        .try-card {
          background: #0c0c10;
          border: 1px solid #1e1e24;
          border-radius: 16px;
          padding: 2rem;
          margin: 2.5rem 0;
          position: relative;
          overflow: hidden;
        }
        .try-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.3), transparent);
        }
        .try-card h3 {
          font-family: 'Anybody', sans-serif;
          font-weight: 700;
          font-size: 1.3rem;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .try-card p {
          font-size: 0.85rem;
          color: #555;
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }
        .endpoint-box {
          background: #111118;
          border: 1px solid #1e1e28;
          border-radius: 10px;
          padding: 0.85rem 1rem;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .endpoint-box:hover {
          border-color: rgba(74,222,128,0.3);
          background: #13131b;
        }
        .endpoint-method {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.45rem;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .method-get {
          background: rgba(74,222,128,0.15);
          color: #4ade80;
        }
        .endpoint-url {
          flex: 1;
          font-size: 0.8rem;
          color: #888;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .endpoint-url strong { color: #c8cad0; }
        .copy-btn {
          font-size: 0.7rem;
          color: #555;
          background: none;
          border: 1px solid #222;
          border-radius: 6px;
          padding: 0.25rem 0.6rem;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Mono', monospace;
          flex-shrink: 0;
        }
        .copy-btn:hover { border-color: #4ade80; color: #4ade80; }
        .copy-btn.copied { border-color: #4ade80; color: #4ade80; }
        .endpoint-label {
          font-size: 0.72rem;
          color: #444;
          margin-bottom: 0.4rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }
        .dot-red { background: #ef4444; }
        .dot-green { background: #4ade80; }
        .response-preview {
          background: #0c0c10;
          border: 1px solid #1e1e24;
          border-radius: 12px;
          overflow: hidden;
          margin: 2rem 0;
        }
        .response-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1rem;
          background: #0a0a0e;
          border-bottom: 1px solid #1a1a1e;
        }
        .response-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
        }
        .status-badge {
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-weight: 500;
          font-size: 0.7rem;
        }
        .badge-402 { background: rgba(239,68,68,0.15); color: #ef4444; }
        .badge-200 { background: rgba(74,222,128,0.15); color: #4ade80; }
        .response-body {
          padding: 1rem 1.25rem;
          font-size: 0.78rem;
          line-height: 1.7;
          color: #6a6a7a;
          overflow-x: auto;
        }
        .json-key { color: #a5b4fc; }
        .json-string { color: #86efac; }
        .json-number { color: #fbbf24; }
        .json-bool { color: #f472b6; }
        .footer {
          text-align: center;
          padding: 2rem;
          font-size: 0.7rem;
          color: #333;
          border-top: 1px solid #111;
        }
        .footer a { color: #4ade80; text-decoration: none; }
        .footer a:hover { text-decoration: underline; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: fadeInUp 0.6s ease-out both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
        .delay-6 { animation-delay: 0.6s; }
        @media (max-width: 500px) {
          .stats-bar { flex-direction: column; }
          .gate { padding: 2rem 1rem 1.5rem; }
          .price-dollar { font-size: 3rem; }
        }
      `}</style>

      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="scanlines" />

      <div className="page">
        <header className="gate">
          <div className="toll-sign animate-in">⬡ Agent Toll Booth ⬡</div>
          <h1 className="title animate-in delay-1">AGENT<br/>TOLL BOOTH</h1>
          <p className="tagline animate-in delay-2">
            This endpoint charges <strong>AI agents $0.50</strong> to access premium content.
            No token, no entry.
          </p>
          <div className="price-display animate-in delay-3">
            <span className="price-dollar">$0.50</span>
            <span className="price-label">per request<br/>via Stripe</span>
          </div>
        </header>

        <div className="content">
          <div className="stats-bar animate-in delay-4">
            <div className="stat">
              <span className="stat-value">{chargeCount}</span>
              <span className="stat-label">Agents Charged</span>
            </div>
            <div className="stat">
              <span className="stat-value">$0.50</span>
              <span className="stat-label">Per Request</span>
            </div>
            <div className="stat">
              <span className="stat-value">~30</span>
              <span className="stat-label">Lines of Code</span>
            </div>
          </div>

          <div className="flow-section animate-in delay-5">
            <div className="flow-title">How It Works</div>
            <div className="flow-steps">
              <div className="flow-step">
                <span className="flow-num">1</span>
                <div>
                  <div className="flow-text"><strong>Agent sends a request</strong> to <code>/api/agent-access</code></div>
                </div>
              </div>
              <div className="flow-step">
                <span className="flow-num">2</span>
                <div>
                  <div className="flow-text"><strong>No payment token?</strong></div>
                  <span className="flow-result result-reject">→ 402 Payment Required</span>
                </div>
              </div>
              <div className="flow-step">
                <span className="flow-num">3</span>
                <div>
                  <div className="flow-text"><strong>Token included?</strong> Stripe charges $0.50</div>
                  <span className="flow-result result-pay">→ Stripe processes charge</span>
                </div>
              </div>
              <div className="flow-step">
                <span className="flow-num">4</span>
                <div>
                  <div className="flow-text"><strong>Payment confirmed</strong> — premium content delivered</div>
                  <span className="flow-result result-success">→ 200 OK + content</span>
                </div>
              </div>
            </div>
          </div>

          <div className="try-card animate-in delay-6">
            <h3>Try It</h3>
            <p>Paste these URLs in your browser. <code>tok_visa</code> is Stripe's test token — no real money.</p>

            <div className="endpoint-label">
              <span className="status-dot dot-red"></span>
              Without payment (returns 402)
            </div>
            <div
              className="endpoint-box"
              onClick={() => copyToClipboard(`${liveUrl}/api/agent-access`, 'no-pay')}
            >
              <span className="endpoint-method method-get">GET</span>
              <span className="endpoint-url">{liveUrl || '...'}<strong>/api/agent-access</strong></span>
              <button className={`copy-btn ${copied === 'no-pay' ? 'copied' : ''}`}>
                {copied === 'no-pay' ? '✓ copied' : 'copy'}
              </button>
            </div>

            <div className="endpoint-label" style={{ marginTop: '1rem' }}>
              <span className="status-dot dot-green"></span>
              With payment (charges $0.50, returns content)
            </div>
            <div
              className="endpoint-box"
              onClick={() => copyToClipboard(`${liveUrl}/api/agent-access?token=tok_visa`, 'pay')}
            >
              <span className="endpoint-method method-get">GET</span>
              <span className="endpoint-url">{liveUrl || '...'}<strong>/api/agent-access?token=tok_visa</strong></span>
              <button className={`copy-btn ${copied === 'pay' ? 'copied' : ''}`}>
                {copied === 'pay' ? '✓ copied' : 'copy'}
              </button>
            </div>
          </div>

          <div className="response-preview">
            <div className="response-header">
              <div className="response-status">
                <span className="status-badge badge-402">402</span>
                <span style={{ color: '#555' }}>Payment Required</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#333' }}>No token</span>
            </div>
            <pre className="response-body">{`{
  `}<span className="json-key">"error"</span>{`: `}<span className="json-string">"payment_required"</span>{`,
  `}<span className="json-key">"message"</span>{`: `}<span className="json-string">"This endpoint requires payment."</span>{`,
  `}<span className="json-key">"price"</span>{`: `}<span className="json-string">"$0.50 USD per request"</span>{`
}`}</pre>
          </div>

          <div className="response-preview">
            <div className="response-header">
              <div className="response-status">
                <span className="status-badge badge-200">200</span>
                <span style={{ color: '#555' }}>OK — Paid</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#333' }}>token=tok_visa</span>
            </div>
            <pre className="response-body">{`{
  `}<span className="json-key">"success"</span>{`: `}<span className="json-bool">true</span>{`,
  `}<span className="json-key">"payment"</span>{`: { `}<span className="json-key">"amount"</span>{`: `}<span className="json-string">"$0.50"</span>{`, `}<span className="json-key">"status"</span>{`: `}<span className="json-string">"succeeded"</span>{` },
  `}<span className="json-key">"premium_content"</span>{`: {
    `}<span className="json-key">"message"</span>{`: `}<span className="json-string">"Welcome, agent! Here's your content."</span>{`,
    `}<span className="json-key">"data"</span>{`: { ... }
  }
}`}</pre>
          </div>

          <div className="footer">
            Built with Next.js + Stripe + Vercel &nbsp;·&nbsp; Zero installs &nbsp;·&nbsp; ~30 lines of code<br/>
            <a href="https://github.com" target="_blank" rel="noopener">PM → AI-Native Product Builder</a>
          </div>
        </div>
      </div>
    </>
  );
}
