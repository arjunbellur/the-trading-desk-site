import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { ENTITLEMENT_TO_PRICE } from '../src/config/entitlements';

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

  try {
    const { entitlementSlug } = req.body;

    if (!entitlementSlug) {
      return res.status(400).json({ error: 'entitlementSlug is required' });
    }

    // Get user from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Get or create user record
    const { data: userRow } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    let customerId = userRow?.stripe_customer_id;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user.id },
      });
      customerId = customer.id;

      await supabase
        .from('users')
        .upsert({ 
          id: user.id, 
          email: user.email, 
          stripe_customer_id: customerId 
        });
    }

    // Get price ID for entitlement
    const priceId = ENTITLEMENT_TO_PRICE[entitlementSlug];
    if (!priceId) {
      return res.status(400).json({ error: 'Unknown entitlement' });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: entitlementSlug.startsWith('membership:') ? 'subscription' : 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      customer: customerId,
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/billing`,
      metadata: { 
        userId: user.id, 
        entitlementSlug 
      },
      allow_promotion_codes: true,
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
