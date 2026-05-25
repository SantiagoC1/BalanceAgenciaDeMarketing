import { useState, useEffect } from 'react';
import { fetchSiteConfig } from '../lib/api';
import type { SiteConfig } from '../lib/types';

interface UseConfigReturn {
  config: SiteConfig | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook que obtiene y cachea la configuración del sitio desde el Apps Script.
 */
export function useConfig(): UseConfigReturn {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const result = await fetchSiteConfig();

      if (cancelled) return;

      if (result.ok) {
        setConfig(result.data);
      } else {
        setError(result.error);
      }

      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { config, loading, error };
}
