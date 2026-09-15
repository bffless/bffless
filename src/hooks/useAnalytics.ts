/**
 * Analytics hook for tracking conversions with A/B test variant info
 */

// Extend window to include pendo and gtag
declare global {
  interface Window {
    pendo?: {
      track: (eventName: string, metadata?: Record<string, unknown>) => void;
    };
    gtag?: (
      command: 'event' | 'config' | 'js',
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Get a cookie value by name
 */
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

/**
 * Get the current A/B test variant from the __bffless_variant cookie
 */
export function getVariant(): string | null {
  return getCookie('__bffless_variant');
}

/**
 * Track a conversion event in Pendo and Google Analytics with the variant metadata
 */
export function trackConversion(
  eventName: string,
  additionalMetadata?: Record<string, unknown>
) {
  const variant = getVariant();

  const metadata = {
    variant: variant || 'unassigned',
    ...additionalMetadata,
  };

  // Log for debugging (can be removed in production)
  console.log(`[Analytics] ${eventName}`, metadata);

  // Fire Pendo track event if Pendo is loaded
  if (window.pendo?.track) {
    window.pendo.track(eventName, metadata);
  } else {
    console.warn('[Analytics] Pendo not loaded, event not sent:', eventName);
  }

  // Fire Google Analytics event if gtag is loaded.
  // GA4 reserves 'source', 'medium', 'campaign', 'content', 'term' as session
  // attribution keys — passing them as custom event params overwrites the session
  // source/medium and pollutes channel reporting. Rename 'source' → 'cta_source'
  // before sending to GA4 only (Pendo receives the original key unchanged).
  if (window.gtag) {
    const ga4Metadata: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(metadata)) {
      const reserved = ['source', 'medium', 'campaign', 'content', 'term'];
      ga4Metadata[reserved.includes(k) ? `cta_${k}` : k] = v;
    }
    window.gtag('event', eventName, ga4Metadata);
  } else {
    console.warn('[Analytics] gtag not loaded, event not sent:', eventName);
  }
}

/**
 * Hook to get analytics functions
 */
export function useAnalytics() {
  return {
    getVariant,
    trackConversion,
    trackSignupClick: (source: string) => {
      trackConversion('signup_click', { source });
    },
  };
}
