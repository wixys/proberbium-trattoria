<template>
  <uiContentPage :content="content" :sections="sections" />
</template>

<script setup lang="ts">
  const { companyData } = useCompanyData();
  const { contentData } = useContentData();
  const { sectionData } = useSectionsData();
  const config = useRuntimeConfig();

  // Usar el idioma por defecto
  const lang = config.public.defaultLocale;

  const { data: company } = await companyData(lang);
  const { data: content } = await contentData(lang);
  const { data: sections } = await sectionData(lang);

  const title = computed(
    () => content.value?.attributes.title + ' | ' + config.public.appName || ''
  );
  const description = computed(
    () => content.value?.attributes.description.replace(/(<([^>]+)>)/gi, '') || ''
  );

  useHead({
    title: title,
    meta: [
      { property: 'og:locale', content: lang },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
    ],
  });
</script>
