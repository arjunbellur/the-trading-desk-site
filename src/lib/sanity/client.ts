import { createClient } from '@sanity/client';

// Sanity configuration - all values read from environment variables
const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-12-18',
  useCdn: import.meta.env.VITE_SANITY_USE_CDN === 'true' || true,
  // token: import.meta.env.VITE_SANITY_TOKEN, // Only if you need write access
};

// Create and export the Sanity client
export const sanityClient = createClient(config);

// Helper function to check if Sanity is properly configured
export const isSanityConfigured = (): boolean => {
  return !!(config.projectId && config.dataset);
};

// Error handling for missing configuration
export const validateSanityConfig = (): void => {
  if (!config.projectId) {
    console.warn('VITE_SANITY_PROJECT_ID is not set. Sanity client will not work.');
  }
  
  if (!config.dataset) {
    console.warn('VITE_SANITY_DATASET is not set. Using default: production');
  }
};

// Call validation on module load (development only)
if (import.meta.env.DEV) {
  validateSanityConfig();
}
