/**
 * Entitlement to Stripe Price ID mapping
 * Configure these in your Stripe dashboard and set the corresponding environment variables
 */
export const ENTITLEMENT_TO_PRICE: Record<string, string> = {
  'membership:all-access': import.meta.env.VITE_STRIPE_PRICE_ALL_ACCESS || 'price_placeholder_all_access',
  'course:orderflow-basics': import.meta.env.VITE_STRIPE_PRICE_ORDERFLOW_BASICS || 'price_placeholder_orderflow',
  'course:price-action-pro': import.meta.env.VITE_STRIPE_PRICE_PRICE_ACTION_PRO || 'price_placeholder_price_action',
};

/**
 * Reverse mapping for webhook processing
 */
export const PRICE_TO_ENTITLEMENT: Record<string, string> = Object.fromEntries(
  Object.entries(ENTITLEMENT_TO_PRICE).map(([entitlement, price]) => [price, entitlement])
);

/**
 * Entitlement metadata for UI display
 */
export const ENTITLEMENT_METADATA: Record<string, { name: string; description: string; price?: string }> = {
  'membership:all-access': {
    name: 'All Access Membership',
    description: 'Unlock all courses and premium content',
  },
  'course:orderflow-basics': {
    name: 'Order Flow Basics',
    description: 'Master the fundamentals of order flow trading',
  },
  'course:price-action-pro': {
    name: 'Price Action Pro',
    description: 'Advanced price action strategies and techniques',
  },
};
