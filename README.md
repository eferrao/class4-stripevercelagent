# 🤖 Agent Toll Booth

A simple Vercel site that charges AI agents $0.10 to access premium content via Stripe.

**Zero installs required.** Everything is edited and deployed through your browser.

## What This Does

- Humans visit the site → see a landing page explaining how it works
- AI agents hit `/api/agent-access` without payment → get a `402 Payment Required`
- AI agents hit `/api/agent-access?token=tok_visa` → get charged $0.10 → receive premium content

## Quick Start (All in Browser)

### 1. Fork This Repo
Click **"Use this template"** or **"Fork"** on GitHub. You now have your own copy.

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your forked repo
4. Click **Deploy** — done! You have a live URL.

### 3. Add Your Stripe Key
1. Go to [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Secret key** (starts with `sk_test_...`)
3. In Vercel: **Settings → Environment Variables**
4. Add: `STRIPE_SECRET_KEY` = your secret key
5. **Redeploy** (Deployments tab → three dots → Redeploy)

### 4. Test It
Open [hoppscotch.io](https://hoppscotch.io) in your browser:

**Test without payment:**
```
GET https://your-site.vercel.app/api/agent-access
```
→ Should return `402 Payment Required`

**Test with payment:**
```
GET https://your-site.vercel.app/api/agent-access?token=tok_visa
```
→ Should return `200` with premium content

**Check Stripe Dashboard:**
Go to [dashboard.stripe.com/test/payments](https://dashboard.stripe.com/test/payments) — you should see a $0.10 charge!

## Customizing

Edit `pages/api/agent-access.js` to change:
- **Price**: Change `amount: "10"` (10 cents) to any amount
- **Content**: Change the `premium_content` object to return whatever you want
- **Gate logic**: Add user-agent detection, API keys, or rate limiting

## Tech Stack

- **Next.js** on Vercel (serverless functions)
- **Stripe API** (raw fetch, no SDK needed)
- **Zero dependencies** beyond Next.js + React

## Files

```
├── pages/
│   ├── index.js              ← Landing page (what humans see)
│   └── api/
│       └── agent-access.js   ← The toll booth (charges agents)
├── package.json
└── README.md
```

---

Built as part of the **PM → AI-Native Product Builder** cohort course.
