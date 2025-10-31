<template>
  <template v-for="article in articlesList">
    <template v-if="article.featured">
      <div :class="article.row_class">
        <template v-if="article.images.length">
          <div :class="article.images_col_class">
            <UiMediaImages :images="article.images" :width="'100%'" :class="article.images_class" />
          </div>
        </template>
        <div :class="article.article_col_class">
          <div :class="article.article_wrapper_class">
            <div :class="article.article_container_class">
              <div :class="article.article_content_class">
                <h4 :class="article.article_title_class">
                  <i v-if="article.icon" :class="article.icon"></i>
                  {{ article.title }}
                </h4>
                <div :class="article.article_paragraph_class" v-html="article.description"></div>
                <template
                  v-if="article.call_to_action && article.call_to_action.active"
                  class="text-center"
                >
                  <UiButtonsBaseButton
                    :to="article.call_to_action.link"
                    :buttonText="article.call_to_action.title"
                    :icon="article.call_to_action.icon"
                    :class="article.call_to_action.class"
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <template v-if="article.row_class">
        <div :class="article.row_class">
          <template v-if="article.images.length">
            <div :class="article.images_col_class">
              <UiMediaImages
                :images="article.images"
                :width="'100%'"
                :class="article.images_class"
              />
            </div>
          </template>
          <template v-else>
            <div :class="article.images_col_class">
              <UiMediaImages
                :images="[]"
                :width="'100%'"
                :class="article.images_class"
              />
            </div>
          </template>
          <div :class="article.article_col_class">
            <div :class="article.article_wrapper_class">
              <div :class="article.article_container_class">
                <div :class="article.article_content_class">
                  <h4 :class="article.article_title_class">
                    <i v-if="article.icon" :class="article.icon"></i>
                    {{ article.title }}
                  </h4>
                  <div :class="article.article_paragraph_class" v-html="article.description"></div>
                  <p v-for="(metaField, key) in article.meta?.attributes" :key="key" class="text-end px-4 fw-bold mb-4">
                    <template v-if="metaField.amount">
                      {{ formatCurrency(metaField.amount, metaField.currency, metaField.display.symbol, metaField.display.position) }}
                    </template>
                  </p>
                  <template v-if="article.show_published_at">
                    <p :class="article.published_at_class">
                      <small v-if="article.published_at_icon">
                        <i :class="article.published_at_icon"></i>
                        {{ formatDate(article.published_at) }}
                      </small>
                    </p>
                  </template>
                  <template
                    v-if="article.call_to_action && article.call_to_action.active"
                    class="text-center"
                  >
                    <UiButtonsBaseButton
                      :to="article.call_to_action.link"
                      :buttonText="article.call_to_action.title"
                      :icon="article.call_to_action.icon"
                      :class="article.call_to_action.class"
                    />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div :class="article.article_col_class">
          <div :class="article.article_wrapper_class">
            <div :class="article.article_container_class">
              <div :class="article.article_content_class">
                <template v-if="article.icon && article.icon_position">
                  <template v-if="article.icon_position === 'top'">
                    <p class="text-center"><i :class="article.icon"></i></p>
                    <h4 :class="article.article_title_class">
                      <template v-if="article.link">
                        <NuxtLink :to="article.link" class="text-decoration-none text-white">{{
                          article.title
                        }}</NuxtLink>
                      </template>
                      <template v-else> {{ article.title }}</template>
                    </h4>
                    <div
                      :class="article.article_paragraph_class"
                      v-html="article.description"
                    ></div>
                    <template v-if="article.call_to_action && article.call_to_action.active">
                      <UiButtonsBaseButton
                        :to="article.call_to_action.link"
                        :buttonText="article.call_to_action.title"
                        :icon="article.call_to_action.icon"
                        :class="article.call_to_action.class"
                      />
                    </template>
                  </template>
                </template>
                <template v-else>
                  <h4 :class="article.article_title_class">
                    <i v-if="article.icon" :class="article.icon"></i>
                    {{ article.title }}
                  </h4>
                  <div :class="article.article_paragraph_class" v-html="article.description"></div>

                  <div v-if="article.videos" :class="article.videos_row_class">
                    <div v-for="video in article.videos">
                      <div :class="article.videos_col_class">
                        <div :class="article.videos_class">
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
                    </div>
                  </div>

                  <template
                    v-if="article.call_to_action && article.call_to_action.active"
                    class="text-center"
                  >
                    <UiButtonsBaseButton
                      :to="article.call_to_action.link"
                      :buttonText="article.call_to_action.title"
                      :icon="article.call_to_action.icon"
                      :class="article.call_to_action.class"
                    />
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
  </template>
</template>

<script setup>
  const router = useRouter();
  const props = defineProps({
    articles: {
      type: Array,
      required: false,
    },
  });

  const articlesList = computed(() => {
    if (!props.articles) return '';
    // Order articles by created_at field descending
    return props.articles.sort((b, a) => {
      return new Date(a.published_at) - new Date(b.published_at);
    });
  });

  //   const getCoverImage = (images) => {
  //     return images.find((image) => image.cover === true) || {};
  //   };

  //   const goTo = () => {
  //     router.push('/reserva-una-cita');
  //   };

  //   const carouselSlides = ref([]);
  //   const initCarousel = ref(false);

  //   onMounted(() => {
  //     if (props.article && props.article.articles_images) {
  //       carouselSlides.value = props.article.articles_images.map((image) => image.url);
  //       initCarousel.value = true;
  //     }
  //   });
</script>

<!-- <style scoped>
  .card-hover:hover {
    transform: translateY(-19px); /* Desplazar hacia arriba 5px */
    transition: transform 0.6s ease; /* Agregar una transición suave */
  }
</style> -->
