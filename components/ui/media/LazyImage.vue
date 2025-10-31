<template>
  <div class="image-container">
    <img ref="lazyImage" :src="imageSrc" :alt="alt" v-bind="$attrs" :class="{ loading: !loaded }" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
  });

  const imageSrc = ref('');
  const lazyImage = ref<HTMLImageElement | null>(null);
  const loaded = ref(false);

  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          imageSrc.value = props.src;
          observer.unobserve(entry.target);
          loaded.value = true;
        }
      });
    });

    if (lazyImage.value) {
      observer.observe(lazyImage.value);
    }
  });
</script>

<style scoped>
  .image-container {
    position: relative;
    width: 100%;
    height: auto;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    opacity: 0;
    transition: opacity 0.5s;
  }

  img.loading {
    opacity: 0;
  }

  img:not(.loading) {
    opacity: 1;
  }
</style>
