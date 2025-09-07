import { createClient } from '@supabase/supabase-js';
import { SignJWT } from 'jose';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { lessonId, playbackId, accessTag } = req.body;

    if (!lessonId || !playbackId || !accessTag) {
      return res.status(400).json({ error: 'Missing required parameters' });
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

    // Check if user has required entitlement
    const hasAccess = await userHasEntitlement(user.id, accessTag);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Generate signed playback token
    const signedToken = await generateMuxSignedToken(playbackId);

    return res.json({ 
      url: `https://stream.mux.com/${playbackId}.m3u8?token=${signedToken}`,
      expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour
    });
  } catch (error) {
    console.error('Mux signed playback error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function userHasEntitlement(userId: string, accessTag: string): Promise<boolean> {
  if (!accessTag || accessTag === 'free') {
    return true;
  }

  try {
    const { data, error } = await supabase
      .from('user_entitlements')
      .select(`
        status,
        entitlements!inner(slug)
      `)
      .eq('user_id', userId)
      .eq('status', 'active');

    if (error) {
      console.error('Error checking entitlements:', error);
      return false;
    }

    const userEntitlements = data?.map((item: any) => item.entitlements.slug) || [];
    
    return userEntitlements.includes(accessTag) || 
           userEntitlements.includes('membership:all-access');
  } catch (error) {
    console.error('Error checking entitlements:', error);
    return false;
  }
}

async function generateMuxSignedToken(playbackId: string): Promise<string> {
  const tokenId = process.env.MUX_TOKEN_ID;
  const tokenSecret = process.env.MUX_TOKEN_SECRET;

  if (!tokenId || !tokenSecret) {
    throw new Error('Mux credentials not configured');
  }

  try {
    const secret = new TextEncoder().encode(tokenSecret);
    
    const token = await new SignJWT({
      sub: playbackId,
      aud: 'v',
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(tokenId)
      .sign(secret);

    return token;
  } catch (error) {
    console.error('Error generating Mux token:', error);
    throw new Error('Failed to generate signed token');
  }
}
