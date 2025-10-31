import VueGtag, { trackRouter } from 'vue-gtag-next';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  if (!process.client || !config.public.production_mode || !config.public.google_analytics_id)
    return;

  nuxtApp.vueApp.use(VueGtag, {
    property: { id: config.public.google_analytics_id, debug: false },
  });
  trackRouter(useRouter());
});
