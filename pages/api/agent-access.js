// /api/agent-access.js
// This is the "toll booth" — it charges AI agents to access premium content.

export default async function handler(req, res) {
  // ─── Step 1: Check for a payment token ───
  // Agents pass a Stripe test token as a query param or header.
  const token =
    req.query.token ||
    req.headers["x-payment-token"] ||
    null;

  // ─── Step 2: If no token, return 402 Payment Required ───
  if (!token) {
    return res.status(402).json({
      error: "payment_required",
      message: "This endpoint requires payment. Include a Stripe token.",
      how_to_pay: {
        method: "GET or POST",
        url: "/api/agent-access?token=tok_visa",
        note: "Use tok_visa for Stripe test mode. In production, use a real payment method token.",
      },
      price: "$0.10 USD per request",
    });
  }

  // ─── Step 3: Charge via Stripe API (no SDK needed!) ───
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  if (!STRIPE_SECRET_KEY) {
    return res.status(500).json({
      error: "server_config_error",
      message: "Stripe secret key is not configured. Add it as a Vercel environment variable.",
    });
  }

  try {
    const chargeResponse = await fetch("https://api.stripe.com/v1/charges", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // amount is in cents — 10 = $0.10
      body: new URLSearchParams({
        amount: "10",
        currency: "usd",
        source: token,
        description: "Agent Toll Booth — content access fee",
      }).toString(),
    });

    const charge = await chargeResponse.json();

    // ─── Step 4: If charge failed, tell the agent ───
    if (charge.error) {
      return res.status(400).json({
        error: "payment_failed",
        message: charge.error.message,
        stripe_error: charge.error.type,
      });
    }

    // ─── Step 5: Payment succeeded! Return the premium content ───
    return res.status(200).json({
      success: true,
      payment: {
        amount: "$0.10",
        charge_id: charge.id,
        status: charge.status,
      },
      premium_content: {
        message: "Welcome, agent! You've paid the toll. Here's your premium content.",
        data: {
          fact: "The first computer programmer was Ada Lovelace in the 1840s.",
          tip: "You can customize this response to return anything — API data, generated text, database results.",
          timestamp: new Date().toISOString(),
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: "server_error",
      message: "Something went wrong processing the payment.",
      detail: err.message,
    });
  }
}
