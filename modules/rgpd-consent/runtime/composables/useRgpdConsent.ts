type RgpdCategory = 'necessary' | 'analytics' | 'preferences' | 'marketing';

type RgpdDecision = Record<RgpdCategory, boolean>;

type RgpdStatus = 'unknown' | 'accepted_all' | 'rejected_all' | 'custom';

interface RgpdConsentState {
  status: RgpdStatus;
  revision: string;
  updatedAt: string | null;
  decision: RgpdDecision;
}

interface StoredConsent {
  status?: RgpdStatus;
  revision?: string;
  updatedAt?: string;
  decision?: Partial<RgpdDecision>;
}

const DEFAULT_DECISION: RgpdDecision = {
  necessary: true,
  analytics: false,
  preferences: false,
  marketing: false,
};

const createDefaultState = (revision: string): RgpdConsentState => ({
  status: 'unknown',
  revision,
  updatedAt: null,
  decision: { ...DEFAULT_DECISION },
});

const safeParseConsent = (raw: unknown): StoredConsent | null => {
  if (!raw) return null;

  if (typeof raw === 'object' && !Array.isArray(raw)) {
    return raw as StoredConsent;
  }

  if (typeof raw !== 'string') {
    return null;
  }

  const attempts: string[] = [raw];
  let candidate = raw;
  for (let i = 0; i < 3; i += 1) {
    try {
      const decoded = decodeURIComponent(candidate);
      if (!decoded || decoded === candidate) break;
      attempts.push(decoded);
      candidate = decoded;
    } catch {
      break;
    }
  }

  for (const candidate of attempts) {
    try {
      const parsed = JSON.parse(candidate);
      if (parsed && typeof parsed === 'object') {
        return parsed as StoredConsent;
      }
    } catch {
      // Try next candidate.
    }
  }

  return null;
};

export const useRgpdConsent = () => {
  const runtimeConfig = useRuntimeConfig();
  const consentConfig = runtimeConfig.public.rgpdConsent as {
    cookieName?: string;
    storageKey?: string;
    revision?: string;
    maxAgeDays?: number;
    policyPath?: string;
  };

  const cookieName = consentConfig.cookieName || 'rgpd-consent';
  const storageKey = consentConfig.storageKey || 'rgpd-consent-state';
  const revision = consentConfig.revision || '1';
  const maxAgeDays = consentConfig.maxAgeDays || 180;
  const policyPath = consentConfig.policyPath || '/es/politica-de-privacidad';

  const state = useState<RgpdConsentState>('rgpd-consent-state', () => createDefaultState(revision));
  const isBannerVisible = useState<boolean>('rgpd-consent-banner-visible', () => true);
  const isPreferencesOpen = useState<boolean>('rgpd-consent-preferences-open', () => false);

  const cookie = useCookie<string | null>(cookieName, {
    sameSite: 'lax',
    maxAge: maxAgeDays * 24 * 60 * 60,
    path: '/',
  });

  const readClientCookie = (): string | null => {
    if (!import.meta.client) return null;
    const encodedName = encodeURIComponent(cookieName);
    const match = document.cookie
      .split('; ')
      .find((entry) => entry.startsWith(`${encodedName}=`) || entry.startsWith(`${cookieName}=`));
    if (!match) return null;
    const index = match.indexOf('=');
    if (index === -1) return null;
    return match.slice(index + 1);
  };

  const writeClientCookie = (payload: string) => {
    if (!import.meta.client) return;
    const maxAgeSeconds = maxAgeDays * 24 * 60 * 60;
    const expires = new Date(Date.now() + maxAgeSeconds * 1000).toUTCString();
    const encodedName = encodeURIComponent(cookieName);
    const encodedPayload = encodeURIComponent(payload);
    document.cookie = `${encodedName}=${encodedPayload}; Max-Age=${maxAgeSeconds}; Expires=${expires}; Path=/; SameSite=Lax`;
  };

  const clearClientCookie = () => {
    if (!import.meta.client) return;
    document.cookie = `${encodeURIComponent(cookieName)}=; Max-Age=0; Path=/; SameSite=Lax`;
  };

  const normalize = (input: StoredConsent | null | undefined): RgpdConsentState => {
    if (!input || typeof input !== 'object') {
      return createDefaultState(revision);
    }

    const next: RgpdConsentState = {
      status: input.status || 'unknown',
      revision: input.revision || revision,
      updatedAt: input.updatedAt || null,
      decision: {
        necessary: true,
        analytics: Boolean(input.decision?.analytics),
        preferences: Boolean(input.decision?.preferences),
        marketing: Boolean(input.decision?.marketing),
      },
    };

    if (next.revision !== revision) {
      return createDefaultState(revision);
    }

    return next;
  };

  const emitUpdate = () => {
    if (!import.meta.client) return;

    window.dispatchEvent(
      new CustomEvent('rgpd-consent:updated', {
        detail: state.value,
      })
    );
  };

  const applyConsentMode = () => {
    if (!import.meta.client || typeof window.gtag !== 'function') return;

    const decision = state.value.decision;

    window.gtag('consent', 'update', {
      analytics_storage: decision.analytics ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: decision.preferences ? 'granted' : 'denied',
      personalization_storage: decision.preferences ? 'granted' : 'denied',
      security_storage: 'granted',
    });
  };

  const persist = () => {
    const payload = JSON.stringify(state.value);
    cookie.value = payload;

    if (import.meta.client) {
      writeClientCookie(payload);
      localStorage.setItem(storageKey, payload);
    }

    applyConsentMode();
    emitUpdate();
  };

  const setState = (next: RgpdConsentState) => {
    state.value = next;
    isBannerVisible.value = false;
    isPreferencesOpen.value = false;
    persist();
  };

  const acceptAll = () => {
    setState({
      status: 'accepted_all',
      revision,
      updatedAt: new Date().toISOString(),
      decision: {
        necessary: true,
        analytics: true,
        preferences: true,
        marketing: true,
      },
    });
  };

  const rejectNonEssential = () => {
    setState({
      status: 'rejected_all',
      revision,
      updatedAt: new Date().toISOString(),
      decision: { ...DEFAULT_DECISION },
    });
  };

  const saveCustom = (decision: Partial<RgpdDecision>) => {
    setState({
      status: 'custom',
      revision,
      updatedAt: new Date().toISOString(),
      decision: {
        necessary: true,
        analytics: Boolean(decision.analytics),
        preferences: Boolean(decision.preferences),
        marketing: Boolean(decision.marketing),
      },
    });
  };

  const hydrate = () => {
    const cookieRaw = cookie.value ?? readClientCookie();
    if (!cookieRaw) {
      state.value = createDefaultState(revision);
      isBannerVisible.value = true;
      isPreferencesOpen.value = false;
      if (import.meta.client) {
        clearClientCookie();
        localStorage.removeItem(storageKey);
      }
      return;
    }

    const parsedCookie = safeParseConsent(cookieRaw);
    if (!parsedCookie) {
      state.value = createDefaultState(revision);
      isBannerVisible.value = true;
      isPreferencesOpen.value = false;
      cookie.value = null;
      if (import.meta.client) {
        clearClientCookie();
        localStorage.removeItem(storageKey);
      }
      return;
    }

    const fromCookie = normalize(parsedCookie);

    if (fromCookie.status !== 'unknown') {
      state.value = fromCookie;
      isBannerVisible.value = false;
      applyConsentMode();
      return;
    }

    state.value = createDefaultState(revision);
    isBannerVisible.value = true;
    isPreferencesOpen.value = false;
  };

  const reopenPreferences = () => {
    isPreferencesOpen.value = true;
    isBannerVisible.value = true;
  };

  const closePreferences = () => {
    isPreferencesOpen.value = false;
  };

  const resetConsent = () => {
    state.value = createDefaultState(revision);
    cookie.value = null;
    if (import.meta.client) {
      clearClientCookie();
      localStorage.removeItem(storageKey);
    }
    isBannerVisible.value = true;
    isPreferencesOpen.value = false;
    emitUpdate();
  };

  const hasConsent = computed(() => state.value.status !== 'unknown');

  const canUse = (category: Exclude<RgpdCategory, 'necessary'>) => {
    return Boolean(state.value.decision[category]);
  };

  return {
    state,
    hasConsent,
    isBannerVisible,
    isPreferencesOpen,
    policyPath,
    hydrate,
    acceptAll,
    rejectNonEssential,
    saveCustom,
    reopenPreferences,
    closePreferences,
    resetConsent,
    canUse,
  };
};
