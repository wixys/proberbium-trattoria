<template>
  <div v-if="content" id="content">
    <div :class="content.attributes.container_class">
      <div :class="content.attributes.row_class">
        <div :class="content.attributes.col_class">
          <div :class="content.attributes.wrapper_class">
            <h1 :class="content.attributes.title_class">
              {{ content.attributes.title }}
            </h1>
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
            <div v-if="content.attributes.images" class="my-1">
              <UiMediaCarousel :images="content.attributes.images" />
            </div>
            <div
              :class="content.attributes.paragraph_class"
              v-html="content.attributes.content"
            ></div>
            <!-- <template
              v-if="content.attributes.call_to_action && content.attributes.call_to_action.active"
            >
              <UiButtonsBaseButton
                :to="content.attributes.call_to_action.link"
                :buttonText="content.attributes.call_to_action.title"
                :icon="content.attributes.call_to_action.icon"
                :class="content.attributes.call_to_action.class"
              />
            </template> -->
          </div>
          <template v-if="content.attributes.items">
            <div class="row gx-0 mb-4 mb-lg-5 align-items-center">
              <div class="col-md-6 my-5">
                <UiListsItems :items="content.attributes.items" />
              </div>
            </div>
          </template>
        </div>
        <div
          class="col-lg-6 mb-3"
          v-for="img in content.attributes.images_portfolio"
          :key="img.url"
        >
          <UiCard :img="img.url" :showBody="false"> </UiCard>
        </div>
        <template v-if="content.attributes.articles">
          <UiArticle :articles="content.attributes.articles" />
        </template>
        <div v-if="content.attributes.videos" class="col-md-8 my-5 align-items-center">
          <div v-for="video in content.attributes.videos">
            <iframe
              :src="video.url"
              style="width: 100%; height: 400px"
              allowfullscreen
              frameborder="0"
              allowscriptaccess="always"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
        <template v-if="content?.attributes?.columns">
          <div
            v-for="(column, index) in content.attributes.columns"
            :key="index"
            :class="column.col_class"
          >
            <template v-if="column.type === 'contact-info'">
              <div v-if="column.content">
                <img
                  v-if="column.content.logo"
                  :src="column.content.logo.src"
                  :alt="column.content.logo.alt"
                  :width="column.content.logo.width"
                  :class="column.content.logo.class"
                />
                <p v-if="column.content.email" :class="''">
                  <a href="mailto:{{ column.content.email.address }}" class="text-decoration-none">
                    <i :class="column.content.email.icon"></i>
                    <span class="ms-2">{{ column.content.email.address }}</span>
                  </a>
                </p>
                <p v-if="column.content.phone" :class="''">
                  <a href="tel:{{ column.content.phone.number }}" class="text-decoration-none">
                    <i :class="column.content.phone.icon" class=""></i>
                    <span class="ms-2">{{ column.content.phone.number }}</span>
                  </a>
                </p>
                <p v-if="column.content.whatsapp" :class="''">
                  <a
                    :href="`https://wa.me/${column.content.whatsapp.number
                      .trim()
                      .replace(/[^0-9]/g, '')}`"
                    class="text-decoration-none"
                    target="_blank"
                    rel="noopener"
                  >
                    <i :class="column.content.whatsapp.icon"></i>
                    <span class="ms-2">{{ column.content.whatsapp.number }}</span>
                  </a>
                </p>
                <p v-if="column.content.address">
                  <a
                    :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      column.content.address.address
                    )}`"
                    class="text-decoration-none"
                    target="_blank"
                    rel="noopener"
                  >
                    <i :class="column.content.address.icon"></i>
                    <span class="ms-2">{{ column.content.address.address }}</span>
                  </a>
                </p>
              </div>
            </template>
            <template v-if="column.type === 'form'" class="mb-3">
              <UiFormsContact :fields="column.fields" @emailSent="emailSent" />
            </template>
            <template v-if="column.type === 'map'">
              <img
                v-if="column.content.image"
                :src="column.content.image.src"
                :alt="column.content.image.alt"
                :class="column.content.image.class"
              />
            </template>
          </div>
        </template>
        <template
          v-if="content.attributes.call_to_action && content.attributes.call_to_action.active"
        >
          <div class="col-md-6 text-center my-3 align-items-center">
            <button :class="content.attributes.call_to_action.class" @click="callToAction">
              <template v-if="content.attributes.call_to_action.icon">
                <i :class="content.attributes.call_to_action.icon"></i>
              </template>
              {{ content.attributes.call_to_action.title }}
            </button>
          </div>
        </template>
      </div>
    </div>
    <!-- Sections-->
    <template v-if="sectionsCustomers && route.path === '/es/clientes'">
      <UiSection :sections="sectionsCustomers" />
    </template>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
  const { companyData } = useCompanyData();
  const { contentData } = useContentData();
  const { sectionDataCustomer } = useSectionsDataCustomer();
  const route = useRoute();
  const router = useRouter();
  const config = useRuntimeConfig();
  const langParam = route.params.lang as string | undefined;
  const lang = langParam ? langParam : (config.public.defaultLocale as string);
  const page = route.params.page;
  const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : '';
  const { data: sectionsCustomers } = await sectionDataCustomer(lang);

  const { data: company } = await companyData(lang);
  const path = `${lang}/${page}/${slug}`;
  const { data: content, error } = await contentData(path);

  // Captura del `campaign_id` de la URL
  const campaignId = route.query.campaign_id;

  // Verificar y añadir el campo dinámico al formulario
  if (content.value?.attributes?.fields && campaignId) {
    content.value.attributes.fields.push({
      id: 'campaignId',
      type: 'hidden',
      model: 'campaignId',
      value: campaignId,
    });
  }

  // Handle error
  if (error.value) {
    const errorData = {
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
      fatal: true,
    };

    throw createError(errorData);
  }

  const emailSent = () => {
    // Handle email sent confirmation
    // Scroll al mensaje de confirmación
    nextTick(() => {
      const alertEl = document.getElementById('content');
      if (alertEl) {
        alertEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  const callToAction = () => {
    // Redirect to the call to action link
    console.log('Call to action');
    return navigateTo(`${content.value.attributes.call_to_action.link}`);
  };

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
</script>
