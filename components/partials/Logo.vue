<template>
  <div>
    <!-- Logo -->
    <img :src="src" :alt="alt" :class="class" :width="width" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    src: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
    class: {
      type: String,
      required: false,
    },
    width: {
      type: String,
      default: '180',
    },
  });
</script>
