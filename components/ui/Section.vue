<template>
  <div>
    <section
      v-for="section in sections"
      :class="section.attributes.class"
      :id="section.attributes.id"
    >
      <div :class="section.attributes.container_class">
        <div :class="section.attributes.row_class">
          <div v-if="section.attributes.col_class" :class="section.attributes.col_class">
            <h2 :class="section.attributes.title_class">{{ section.attributes.title }}</h2>
            <h2 class="text-white">
              {{ section.attributes.subtitle }}
            </h2>
            <div
              :class="section.attributes.paragraph_class"
              v-html="section.attributes.description"
            ></div>
            <template v-if="section.attributes.map_iframe && section.attributes.map_iframe.url">
              <div class="section-map-wrapper">
                <iframe
                  :src="section.attributes.map_iframe.url"
                  class="section-map-iframe"
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </template>
          </div>
        </div>
        <!-- TODO: Implement portfolio -->
        <div v-if="section.attributes.images_portfolio">
          <div :class="section.attributes.container_portfolio_class">
            <div :class="section.attributes.row_portfolio_class">
              <div
                v-for="img in section.attributes.images_portfolio"
                :key="img"
                :class="section.attributes.col_portfolio_class"
              >
                <img :src="img" :alt="img" :class="section.attributes.portfolio_class" />
                <!-- <UiCard :img="img" :showBody="false"> </UiCard> -->
              </div>
              <!-- <UiCard :img="img.url" :showBody="false"> </UiCard> -->
              <!-- <UiMediaImages
              :images="section.attributes.images_portfolio"
              :width="'100%'"
              :class="'img-fluid'"
            /> -->
            </div>
          </div>
        </div>

        <template v-if="section.attributes.articles.length">
          <div :class="section.attributes.row_class">
            <UiArticle :articles="section.attributes.articles" />
          </div>
        </template>

        <template v-if="section.attributes.images.length">
          <UiMediaImages :images="section.attributes.images" :width="'100%'" :class="'img-fluid'" />
        </template>
      </div>
      <template
        v-if="section.attributes.call_to_action && section.attributes.call_to_action.active"
      >
        <div class="text-center mt-5">
          <UiButtonsBaseButton
            :to="section.attributes.call_to_action.link"
            :buttonText="section.attributes.call_to_action.title"
            :icon="section.attributes.call_to_action.icon"
            :class="section.attributes.call_to_action.class"
          />
        </div>
      </template>
      <template v-if="section.attributes.full_width_image">
        <div
          class="section-fullwidth-image"
          :class="{
            'section-fullwidth-image--parallax': section.attributes.full_width_image.parallax,
          }"
          :style="{
            backgroundImage: `url(${section.attributes.full_width_image.src})`,
            height: section.attributes.full_width_image.height || '300px',
          }"
          role="img"
          :aria-label="section.attributes.full_width_image.alt || 'Imagen de la seccion'"
        ></div>
      </template>
    </section>
  </div>
</template>

<script setup>
  const props = defineProps({
    sections: {
      type: Array,
      required: true,
    },
  });
  const sortedSections = computed(() => {
    return [...props.sections].sort((a, b) => a.attributes.sort - b.attributes.sort);
  });
</script>

<style scoped>
  #localizacion {
    position: relative;
    overflow: hidden;
    background-color: #a16468;
  }

  #localizacion::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.08) 0,
      rgba(255, 255, 255, 0.08) 1px,
      transparent 1px,
      transparent 16px
    );
    opacity: 1;
    pointer-events: none;
  }

  #localizacion > * {
    position: relative;
    z-index: 1;
  }

  .section-map-wrapper {
    width: 100%;
    height: 320px;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }

  .section-map-iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  .section-fullwidth-image {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .section-fullwidth-image--parallax {
    background-attachment: fixed;
  }

  @media (max-width: 991.98px) {
    .section-fullwidth-image--parallax {
      background-attachment: scroll;
    }
  }
</style>
