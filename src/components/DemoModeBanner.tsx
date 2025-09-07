import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

export function DemoModeBanner() {
  const isDemoMode = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!isDemoMode) return null;

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-4 py-3 text-sm">
      <div className="flex items-center gap-2 max-w-7xl mx-auto">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        <span>
          <strong>Demo Mode:</strong> Supabase, Stripe, and Mux integrations are not configured. 
          See <code className="bg-yellow-500/20 px-1 rounded">MEMBERSHIP_SETUP.md</code> for setup instructions.
        </span>
        <a 
          href="https://github.com/your-repo#setup" 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1 hover:text-yellow-300 transition-colors"
        >
          Setup Guide
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
