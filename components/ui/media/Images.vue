<template>
  <div v-for="(image, index) in images" :key="index">
    <img :width="width" :src="image" :alt="'Image ' + (index + 1)" :class="class" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    images: {
      type: Array,
      required: true,
    },
    width: {
      type: String,
      default: '100%',
    },
    class: {
      type: String,
    },
  });
</script>
