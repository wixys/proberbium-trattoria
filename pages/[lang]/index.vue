<template>
  <uiContentPage :content="content" :sections="sections" />
</template>

<script setup lang="ts">
  const { contentData } = useContentData();
  const { sectionData } = useSectionsData();
  const config = useRuntimeConfig();
  const route = useRoute();
  const langParam = route.params.lang as string | undefined;
  const lang = langParam ? langParam : (config.public.defaultLocale as string);

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
