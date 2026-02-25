export default defineNuxtPlugin(() => {
  const consent = useRgpdConsent();
  consent.hydrate();
});
