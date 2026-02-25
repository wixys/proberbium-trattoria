# RGPD Consent Module (Nuxt 3)

Reusable consent manager module focused on EU RGPD/ePrivacy basics.

## Features

- Banner first layer: `Aceptar todas`, `Rechazar no esenciales`, `Configurar`
- Preferences modal by categories: necesarias, analiticas, preferencias, marketing
- Consent persisted in cookie + localStorage
- Revision versioning (re-prompts users when policy version changes)
- `gtag('consent', 'update', ...)` bridge aligned to analytics/preferencias (ads de terceros denegado)
- Global component: `<RgpdConsentBanner />`
- Composable: `useRgpdConsent()`

## Usage in this project

Module is registered in `nuxt.config.ts`:

```ts
modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/i18n', './modules/rgpd-consent']
```

Banner is rendered in layouts:

```vue
<RgpdConsentBanner />
```

## Reuse in another Nuxt project

1. Copy folder `modules/rgpd-consent` to your project.
2. Register module path in `nuxt.config.ts` modules.
3. Add `<RgpdConsentBanner />` in your main layout.
4. Optional config:

```ts
rgpdConsent: {
  cookieName: 'rgpd-consent',
  storageKey: 'rgpd-consent-state',
  revision: '2026-02-25',
  policyPath: '/es/politica-de-privacidad',
  maxAgeDays: 180,
  defaultLanguage: 'es'
}
```

## Notes

- This is an in-house baseline CMP module. Validate legal texts/policy with counsel.
- For strict blocking of third-party scripts before consent, wire script loaders to `useRgpdConsent().canUse(...)`.
