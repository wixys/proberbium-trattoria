<template>
  <div class="custom-carousel-container">
    <div class="custom-carousel" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div class="custom-carousel-item" v-for="(image, index) in images" :key="index">
        <UiMediaLazyImage :src="image" :alt="`Carousel image ${index + 1}`" />
      </div>
    </div>
    <button class="custom-carousel-control prev" @click="prevSlide">
      <i class="bi bi-chevron-left fs-4"></i>
    </button>
    <button class="custom-carousel-control next" @click="nextSlide">
      <i class="bi bi-chevron-right fs-4"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    images: {
      type: Array,
      required: true,
    },
    navigation: {
      type: Boolean,
      default: true,
    },
  });

  const currentIndex = ref(0);

  onMounted(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    onBeforeUnmount(() => {
      clearInterval(interval);
    });
  });

  const prevSlide = () => {
    currentIndex.value =
      currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1;
  };

  const nextSlide = () => {
    currentIndex.value =
      currentIndex.value === props.images.length - 1 ? 0 : currentIndex.value + 1;
  };
</script>

<style scoped>
  .custom-carousel-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .custom-carousel {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }

  .custom-carousel-item {
    min-width: 100%;
  }

  .custom-carousel-item img {
    width: 100%;
    display: block;
  }

  .custom-carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1.5rem;
    padding: 0.5rem;

    cursor: pointer;
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }
</style>
