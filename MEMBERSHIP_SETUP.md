# 🚀 TradeMasters Membership System Setup Guide

This guide will help you set up the complete membership-gated content system with Supabase Auth, Stripe payments, and Mux video delivery.

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Stripe account
- Mux account
- Sanity account (optional, for content management)

## 🔧 Environment Setup

### 1. Create Environment File

Create `.env.local` in your project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Stripe Price IDs (create these in your Stripe dashboard)
VITE_STRIPE_PRICE_ALL_ACCESS=price_your_all_access_price_id
VITE_STRIPE_PRICE_ORDERFLOW_BASICS=price_your_orderflow_basics_price_id
VITE_STRIPE_PRICE_PRICE_ACTION_PRO=price_your_price_action_pro_price_id

# Mux Configuration
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret

# Sanity Configuration
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-01-01
```

### 2. Supabase Setup

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database migration**:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `database/migrations/001_initial_schema.sql`
   - Execute the migration

3. **Configure Authentication**:
   - Go to Authentication > Settings
   - Enable email confirmations (optional)
   - Configure redirect URLs for your domain

4. **Get your keys**:
   - Go to Settings > API
   - Copy your Project URL and anon key
   - Copy your service role key (keep this secret!)

### 3. Stripe Setup

1. **Create products and prices** in your Stripe dashboard:
   - All Access Membership (subscription)
   - Order Flow Basics Course (one-time payment)
   - Price Action Pro Course (one-time payment)

2. **Set up webhooks**:
   - Go to Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe-webhook`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

3. **Get your keys**:
   - Copy your publishable key and secret key
   - Copy your webhook signing secret

### 4. Mux Setup

1. **Create a Mux account** at [mux.com](https://mux.com)

2. **Get your API credentials**:
   - Go to Settings > API Access Tokens
   - Create a new token with signing permissions
   - Copy your token ID and secret

### 5. Sanity Setup (Optional)

1. **Create a Sanity project** at [sanity.io](https://sanity.io)

2. **Install Sanity CLI**:
   ```bash
   npm install -g @sanity/cli
   ```

3. **Initialize your project**:
   ```bash
   sanity init
   ```

4. **Add the schemas** from `src/lib/sanity/schemas/` to your Sanity project

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy your project**:
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard

4. **Update webhook URLs** in Stripe to point to your Vercel domain

### Netlify Deployment

1. **Build your project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify** and set environment variables

3. **Update webhook URLs** in Stripe

## 🧪 Testing

### Local Testing with Stripe CLI

1. **Install Stripe CLI**:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Windows
   # Download from https://github.com/stripe/stripe-cli/releases
   ```

2. **Login to Stripe**:
   ```bash
   stripe login
   ```

3. **Forward webhooks to local development**:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```

4. **Copy the webhook signing secret** and add it to your `.env.local`

### Test the Flow

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Test user registration**:
   - Go to `/login`
   - Create a new account
   - Verify email (if enabled)

3. **Test course purchase**:
   - Go to `/courses`
   - Click on a premium course
   - Click "Unlock Access"
   - Complete Stripe checkout

4. **Verify webhook processing**:
   - Check your Supabase database
   - Verify `user_entitlements` table has the new record

5. **Test content access**:
   - Try to access premium content
   - Verify paywall is removed

## 📁 File Structure

```
src/
├── components/
│   ├── Paywall.tsx              # Paywall component for gated content
│   ├── VideoPlayer.tsx          # Secure video player with Mux
│   ├── ProtectedRoute.tsx       # Route protection HOC
│   └── Navigation.tsx           # Updated with auth state
├── hooks/
│   ├── useSession.ts            # Supabase auth hook
│   └── useEntitlements.ts       # User entitlements hook
├── lib/
│   ├── supabase/
│   │   └── client.ts            # Supabase client configuration
│   └── sanity/
│       ├── schemas/             # Sanity content schemas
│       └── queries.ts           # GROQ queries
├── pages/
│   ├── Login.tsx                # Updated with Supabase auth
│   ├── Billing.tsx              # Billing management page
│   └── Success.tsx              # Post-checkout success page
└── config/
    └── entitlements.ts          # Entitlement configuration

api/
├── checkout.ts                  # Stripe checkout session creation
├── stripe-webhook.ts            # Stripe webhook handler
├── billing-portal.ts            # Stripe billing portal
└── mux/
    └── signed-playback.ts       # Mux signed playback tokens

database/
└── migrations/
    └── 001_initial_schema.sql   # Database schema
```

## 🔐 Security Features

- **Row Level Security (RLS)** on all database tables
- **JWT-based authentication** with Supabase
- **Signed video tokens** with Mux for secure playback
- **Webhook signature verification** for Stripe events
- **Protected routes** with authentication checks
- **Entitlement-based access control** for content

## 🎯 Key Features

### Authentication
- Email/password registration and login
- OAuth ready (Google, Facebook, etc.)
- Protected routes and components
- Session management

### Payments
- Stripe Checkout integration
- Subscription and one-time payments
- Webhook-based entitlement management
- Billing portal for subscription management

### Content Access
- Entitlement-based gating
- Paywall component for premium content
- Secure video delivery with Mux
- Real-time access updates

### User Experience
- Seamless checkout flow
- Instant access after payment
- Billing management dashboard
- Responsive design

## 🐛 Troubleshooting

### Common Issues

1. **Webhook not receiving events**:
   - Check webhook URL is correct
   - Verify webhook secret in environment variables
   - Check Stripe CLI is forwarding correctly

2. **User entitlements not updating**:
   - Check webhook is processing correctly
   - Verify database triggers are working
   - Check user ID mapping in webhook

3. **Video not playing**:
   - Verify Mux credentials
   - Check signed token generation
   - Ensure user has proper entitlements

4. **Authentication issues**:
   - Check Supabase configuration
   - Verify environment variables
   - Check RLS policies

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
```

## 📚 API Reference

### Authentication Endpoints

- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/stripe-webhook` - Handle Stripe webhooks
- `POST /api/billing-portal` - Create billing portal session
- `POST /api/mux/signed-playback` - Generate signed video tokens

### Database Functions

- `get_user_entitlements(user_id)` - Get user's active entitlements
- `user_has_entitlement(user_id, entitlement_slug)` - Check specific entitlement

## 🚀 Next Steps

1. **Add OAuth providers** (Google, Facebook, etc.)
2. **Implement course progress tracking**
3. **Add user profiles and preferences**
4. **Set up analytics and monitoring**
5. **Add email notifications**
6. **Implement referral system**

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check Supabase, Stripe, and Mux documentation
4. Create an issue in the repository

---

**Happy coding! 🎉**
