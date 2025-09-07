import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { PRICE_TO_ENTITLEMENT } from '../src/config/entitlements';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
  apiVersion: '2024-06-20' 
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'] as string;
  const body = req.body;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const entitlementSlug = session.metadata?.entitlementSlug;

  if (!userId || !entitlementSlug) {
    console.error('Missing metadata in checkout session:', session.id);
    return;
  }

  await grantEntitlement(userId, entitlementSlug, 'active');
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const userId = await lookupUserIdByCustomer(customerId);
  
  if (!userId) {
    console.error('User not found for customer:', customerId);
    return;
  }

  const entitlementSlug = await inferSlugFromPrice(subscription.items.data[0].price.id);
  if (!entitlementSlug) {
    console.error('Entitlement not found for price:', subscription.items.data[0].price.id);
    return;
  }

  const status = mapSubscriptionStatus(subscription.status);
  await grantEntitlement(userId, entitlementSlug, status);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const userId = await lookupUserIdByCustomer(customerId);
  
  if (!userId) {
    console.error('User not found for customer:', customerId);
    return;
  }

  const entitlementSlug = await inferSlugFromPrice(subscription.items.data[0].price.id);
  if (!entitlementSlug) {
    console.error('Entitlement not found for price:', subscription.items.data[0].price.id);
    return;
  }

  await grantEntitlement(userId, entitlementSlug, 'canceled');
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  if (invoice.subscription) {
    // This will be handled by subscription.updated event
    return;
  }

  const customerId = invoice.customer as string;
  const userId = await lookupUserIdByCustomer(customerId);
  
  if (!userId) {
    console.error('User not found for customer:', customerId);
    return;
  }

  const entitlementSlug = await inferSlugFromPrice(invoice.lines.data[0].price!.id);
  if (!entitlementSlug) {
    console.error('Entitlement not found for price:', invoice.lines.data[0].price!.id);
    return;
  }

  await grantEntitlement(userId, entitlementSlug, 'active');
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const userId = await lookupUserIdByCustomer(customerId);
  
  if (!userId) {
    console.error('User not found for customer:', customerId);
    return;
  }

  const entitlementSlug = await inferSlugFromPrice(invoice.lines.data[0].price!.id);
  if (!entitlementSlug) {
    console.error('Entitlement not found for price:', invoice.lines.data[0].price!.id);
    return;
  }

  await grantEntitlement(userId, entitlementSlug, 'past_due');
}

async function grantEntitlement(userId: string, slug: string, status: 'active' | 'canceled' | 'past_due') {
  // Get entitlement ID
  const { data: entitlement } = await supabase
    .from('entitlements')
    .select('id')
    .eq('slug', slug)
    .single();

  if (!entitlement) {
    console.error('Entitlement not found:', slug);
    return;
  }

  // Ensure user exists
  await supabase
    .from('users')
    .upsert({ id: userId });

  // Check if user entitlement already exists
  const { data: existingEntitlement } = await supabase
    .from('user_entitlements')
    .select('id')
    .eq('user_id', userId)
    .eq('entitlement_id', entitlement.id)
    .single();

  if (existingEntitlement) {
    // Update existing entitlement
    await supabase
      .from('user_entitlements')
      .update({ status })
      .eq('id', existingEntitlement.id);
  } else {
    // Create new entitlement
    await supabase
      .from('user_entitlements')
      .insert({
        user_id: userId,
        entitlement_id: entitlement.id,
        status,
        source: 'stripe',
      });
  }
}

function mapSubscriptionStatus(status: string): 'active' | 'canceled' | 'past_due' {
  switch (status) {
    case 'active':
    case 'trialing':
      return 'active';
    case 'past_due':
    case 'unpaid':
      return 'past_due';
    case 'canceled':
    case 'incomplete':
    case 'incomplete_expired':
    case 'unpaid':
      return 'canceled';
    default:
      return 'canceled';
  }
}

async function lookupUserIdByCustomer(customerId: string): Promise<string | null> {
  const { data } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  return data?.id || null;
}

async function inferSlugFromPrice(priceId: string): Promise<string | null> {
  return PRICE_TO_ENTITLEMENT[priceId] || null;
}
