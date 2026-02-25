<template>
  <div>
    <PartialsTopNavbar :show="false" />
    <PartialsNavbar :isNavbarShrink="true" :navbarMarginTop="false" />
    <template v-if="showHomeHeader">
      <PartialsHeader :images="images" />
    </template>
    <template v-else>
      <PartialsBreadcrumb />
    </template>
    <main id="main" data-aos="fade-up">
      <slot />
    </main>
    <RgpdConsentBanner />
    <PartialsFooter />
  </div>
</template>

<script setup lang="ts">
  const { mediaData } = useMediaData();
  const route = useRoute();
  const lang = route.params.lang || 'es'; // Default to 'en' if no lang param
  const { data: images, error } = await mediaData(Array.isArray(lang) ? lang[0] : lang);
  const showHomeHeader = computed(() => {
    const currentLang = Array.isArray(lang) ? lang[0] : lang;
    return route.path === '/' || route.path === `/${currentLang}`;
  });
</script>
