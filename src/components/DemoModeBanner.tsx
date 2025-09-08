import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

export function DemoModeBanner() {
  const isDemoMode = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!isDemoMode) return null;

  return (
    <div className="border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-400">
      <div className="mx-auto flex max-w-7xl items-center gap-2">
        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
        <span>
          <strong>Demo Mode:</strong> Supabase, Stripe, and Mux integrations are not configured. 
          See <code className="rounded bg-yellow-500/20 px-1">MEMBERSHIP_SETUP.md</code> for setup instructions.
        </span>
        <a 
          href="https://github.com/your-repo#setup" 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1 transition-colors hover:text-yellow-300"
        >
          Setup Guide
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
