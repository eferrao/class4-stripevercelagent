import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Agent Toll Booth</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>🤖 Agent Toll Booth</h1>
          <p style={styles.subtitle}>
            This site charges AI agents $0.10 to access premium content.
          </p>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>How It Works</h2>
            <ol style={styles.list}>
              <li>An AI agent sends a request to <code>/api/agent-access</code></li>
              <li>The agent includes a Stripe test token for payment</li>
              <li>We charge $0.10 via Stripe</li>
              <li>The agent receives the premium content</li>
              <li>No token? → 402 Payment Required</li>
            </ol>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Try It</h2>
            <p style={styles.code}>
              {`GET /api/agent-access?token=tok_visa`}
            </p>
            <p style={styles.hint}>
              Use Hoppscotch.io or curl to test. The token <code>tok_visa</code> is
              Stripe's built-in test token — no real money is charged.
            </p>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>What Agents Get</h2>
            <p style={styles.hint}>
              After paying, agents receive a JSON response with your premium
              content. You decide what that content is!
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#e0e0e0",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
  },
  container: {
    maxWidth: "640px",
    width: "100%",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#888",
    marginBottom: "2rem",
  },
  card: {
    background: "#141414",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
  },
  cardTitle: {
    fontSize: "1.2rem",
    color: "#ffffff",
    marginTop: 0,
    marginBottom: "0.75rem",
  },
  list: {
    paddingLeft: "1.25rem",
    lineHeight: "1.8",
  },
  code: {
    background: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    fontFamily: "monospace",
    fontSize: "0.95rem",
    color: "#4ade80",
    overflowX: "auto",
  },
  hint: {
    color: "#888",
    fontSize: "0.9rem",
    lineHeight: "1.6",
    marginTop: "0.75rem",
  },
};
