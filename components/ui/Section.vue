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
