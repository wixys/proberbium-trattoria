<template>
  <div class="card h-100 d-flex flex-column">
    <img
      :src="imageSrc"
      @error="imageSrc = 'https://via.placeholder.com/700x350?text=No+Image'"
      class="card-img-top"
      alt="Imagen noticia"
    />
    <div v-if="showBody" class="card-body d-flex flex-column">
      <div class="small text-muted">{{ date }}</div>
      <h2 class="card-title h4">{{ title }}</h2>
      <p class="card-text flex-grow-1">{{ description }}</p>
      <slot />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: String,
    description: String,
    img: String,
    date: String,
    showBody: { default: true, type: Boolean },
  });

  const imageSrc = ref(props.img || 'https://via.placeholder.com/700x350?text=No+Image');
</script>
