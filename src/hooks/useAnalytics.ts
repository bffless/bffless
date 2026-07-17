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
    variant: variant || 'unknown',
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

  // Fire Google Analytics event if gtag is loaded
  if (window.gtag) {
    window.gtag('event', eventName, metadata);
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
