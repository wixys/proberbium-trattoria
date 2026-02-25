import {
  addComponent,
  addImportsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit';

export interface RgpdConsentModuleOptions {
  cookieName: string;
  storageKey: string;
  revision: string;
  policyPath: string;
  maxAgeDays: number;
  defaultLanguage: 'es' | 'en';
}

export default defineNuxtModule<RgpdConsentModuleOptions>({
  meta: {
    name: 'rgpd-consent-module',
    configKey: 'rgpdConsent',
  },
  defaults: {
    cookieName: 'rgpd-consent',
    storageKey: 'rgpd-consent-state',
    revision: '2026-02-25',
    policyPath: '/es/politica-de-privacidad',
    maxAgeDays: 180,
    defaultLanguage: 'es',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.runtimeConfig.public.rgpdConsent = {
      ...(nuxt.options.runtimeConfig.public.rgpdConsent || {}),
      ...options,
    };

    addImportsDir(resolver.resolve('./runtime/composables'));
    addPlugin(resolver.resolve('./runtime/plugins/consent.client'));

    addComponent({
      name: 'RgpdConsentBanner',
      filePath: resolver.resolve('./runtime/components/RgpdConsentBanner.vue'),
      global: true,
    });
  },
});
