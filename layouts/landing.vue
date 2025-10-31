<template>
  <div>
    <template v-if="route.fullPath === '/' || !route.params.page || route.params.page === ''">
      <PartialsCampaignHeader :images="images" />
    </template>
    <!-- <template v-else>
      <PartialsBreadcrumb />
    </template> -->
    <main id="main" data-aos="fade-up">
      <PartialsCookiesConsent
        v-if="!cookieConsent"
        :key="componentKey"
        @cookiesConsentAccepted="cookiesConsentAccepted"
      />
      <PartialsCookiesPolicy @cookiesConsentNotAccepted="cookiesConsentNotAccepted" />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  const { mediaData } = useMediaData();
  const cookieValue = 'cookie-consent';
  const cookieConsent = useCookie(cookieValue);
  const componentKey = ref(0);
  const route = useRoute();
  const lang = route.params.lang || 'es'; // Default to 'en' if no lang param
  const { data: images, error } = await mediaData(Array.isArray(lang) ? lang[0] : lang);

  const cookiesConsentAccepted = () => {
    cookieConsent.value = cookieValue;
  };

  const cookiesConsentNotAccepted = () => {
    if (!cookieConsent.value) {
      componentKey.value += 1;
    }
  };
</script>
