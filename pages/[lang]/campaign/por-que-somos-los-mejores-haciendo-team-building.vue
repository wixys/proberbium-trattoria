<template>
  <div v-if="content" style="background-color: #005da6">
    <div :class="content.attributes.container_class">
      <div :class="content.attributes.row_class">
        <div :class="content.attributes.col_class">
          <div :class="content.attributes.wrapper_class">
            <section class="next-section">
              <h1 :class="content.attributes.title_class">
                {{ content.attributes.title }}
              </h1>
            </section>
            <div
              :class="content.attributes.paragraph_class"
              v-html="content.attributes.description"
            ></div>
            <template v-if="content.attributes.show_published_at">
              <p :class="content.published_at_class">
                <small v-if="content.attributes.published_at_icon">
                  <i :class="content.attributes.published_at_icon"></i>
                  {{ formatDate(content.attributes.published_at) }}
                </small>
              </p>
            </template>
            <!-- Images -->
            <div v-if="content.attributes.images" class="my-5">
              <UiMediaCarousel :images="content.attributes.images" />
            </div>
            <div
              :class="content.attributes.paragraph_class"
              v-html="content.attributes.content"
            ></div>
            <template
              v-if="content.attributes.call_to_action && content.attributes.call_to_action.active"
            >
              <!-- :to="content.attributes.call_to_action.link" -->
              <UiButtonsBaseButton
                to="/es/solicitar-presupuesto?campaign_id=2025011501"
                :buttonText="content.attributes.call_to_action.title"
                :icon="content.attributes.call_to_action.icon"
                :class="content.attributes.call_to_action.class"
                @track="handleTrack"
              />
            </template>
          </div>
          <template v-if="content.attributes.items">
            <div class="row gx-0 mb-4 mb-lg-5 align-items-center">
              <div class="col-md-6 my-5">
                <UiListsItems :items="content.attributes.items" />
              </div>
            </div>
          </template>
          <div v-if="content.attributes.videos" class="row gx-0 mb-4 mb-lg-5 align-items-center">
            <div class="col-md-3 my-5" v-for="video in content.attributes.videos">
              <iframe
                :src="video.url"
                allowfullscreen
                frameborder="0"
                allowscriptaccess="always"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
          <!-- <template
            v-if="content.attributes.call_to_action && content.attributes.call_to_action.active"
          >
            <button :class="content.attributes.call_to_action.class" @click="callToAction">
              <template v-if="content.attributes.call_to_action.icon">
                <i :class="content.attributes.call_to_action.icon"></i>
              </template>
              {{ content.attributes.call_to_action.title }}
            </button>
          </template> -->
          <template v-if="content.attributes.fields">
            <UiFormsContact :fields="content.attributes.fields" />
          </template>
        </div>
        <template v-if="content.attributes.articles">
          <UiArticle :articles="content.attributes.articles" />
        </template>
      </div>
    </div>
    <!-- Sections-->
    <!-- <template v-if="sections">
      <UiSection :sections="sections" />
    </template> -->
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
  import { useGtag } from 'vue-gtag-next';
  const { companyData } = useCompanyData();
  const { contentData } = useContentData();
  const route = useRoute();
  const config = useRuntimeConfig();
  const langParam = route.params.lang as string | undefined;
  const lang = langParam ? langParam : (config.public.defaultLocale as string);
  const page = route.params.page;
  const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : '';

  const { data: company } = await companyData(lang);
  const path = `${lang}/campaign/por-que-somos-los-mejores-haciendo-team-building`;
  const { data: content, error } = await contentData(path);

  // Handle error
  if (error.value) {
    const errorData = {
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
      fatal: true,
    };

    throw createError(errorData);
  }

  const callToAction = () => {
    // Redirect to the call to action link
    return navigateTo(`${content.value.attributes.call_to_action.link}`);
  };

  const handleTrack = (event: any) => {
    console.log('Event:', event);
    const gtag = useNuxtApp().$gtag; // Acceso al plugin vue-gtag-next
    if (gtag) {
      gtag.event('click', {
        event_category: 'Button',
        event_label: event.label || 'Solicitar Presupuesto', // Asegúrate de recibir o asignar un valor
        value: event.value || 1, // Puedes personalizar el valor si viene en el evento
      });
    }
  };

  // const handleTrack = (data: { label: string; destination: string }) => {
  //   const nuxtApp = useNuxtApp();
  //   const gtag = nuxtApp.$gtag;

  //   if (!gtag) {
  //     console.warn('Google Analytics is not initialized');
  //     return;
  //   }

  //   gtag.trackEvent('cta_click', {
  //     event_category: 'Call to Action',
  //     event_label: data.label,
  //     destination: data.destination,
  //     page_path: window.location.pathname,
  //   });
  // };

  const title = computed(() => {
    if (!content.value) return '';
    return content.value?.attributes.title + ' | ' + config.public.appName;
  });

  const description = computed(() => {
    if (!content.value) return '';
    const descriptionFormatted = content.value?.attributes.description.replace(/(<([^>]+)>)/gi, '');
    return descriptionFormatted;
  });

  const url = computed(() => {
    if (!content.value) return '';
    return config.public.baseUrl + content.value?.links.self;
  });

  const icon = computed(() => {
    return config.public.baseUrl + company.value.attributes.icon;
  });

  useHead({
    title: title,
    meta: [
      {
        hid: title,
        name: title,
        content: description,
      },
      { property: 'og:site_name', content: config.public.appName },
      { property: 'og:locale', content: lang },
      { property: 'og:url', content: url },
      { property: 'og:image', content: icon },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: icon },
    ],
    link: [
      { rel: 'canonical', href: url },
      { rel: 'shortcut icon', type: 'image/png', href: icon },
    ],
  });

  definePageMeta({
    layout: 'landing',
  });
</script>
