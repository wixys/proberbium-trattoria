<template>
  <header>
    <div class="header px-4 py-5 text-center">
      <img
        src="/img/icon.png"
        alt="/img/icon.png"
        class="d-block mx-auto mb-3 img-fluid animated-pulse"
      />
      <div class="col-lg-6 mx-auto">
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a
            href="https://lauyama.com/booking"
            title="Reservar online"
            target="_blank"
            class="btn btn-light px-4 gap-3"
            ><i class="bi bi-calendar-check me-2"></i> Reserva online</a
          >
          <a href="tel:916 320 574" class="btn btn-light px-4 gap-3"><i class="bi bi-telephone me-2"></i> Llamar</a>
          <NuxtLink to="/es/carta" class="btn btn-danger px-4 gap-3"><i class="bi bi-book me-2"></i> Carta</NuxtLink>
        </div>
      </div>
    </div>
    <div class="b-example-divider"></div>
  </header>
</template>

<script setup lang="ts">
  const route = useRoute();
  const props = defineProps({
    title: {
      type: String,
      required: false,
    },
    images: {
      type: Array,
    },
  });

  const isLoading = ref(true);

  const carouselImages = ref(Array());

  onMounted(() => {
    if (props.images) {
      carouselImages.value = props.images;
      isLoading.value = false;
    }
  });

  const video = ref<HTMLVideoElement | null>(null);
  const isMuted = ref(true);
  const buttonText = ref('Unmute');

  const toggleMute = () => {
    if (video.value) {
      video.value.muted = !video.value.muted;
      isMuted.value = video.value.muted;
      buttonText.value = isMuted.value ? 'Unmute' : 'Mute';
    }
  };
</script>

<style>
  .header {
    margin-top: 80px;
    background-image: url('/img/pattern_waves.png');
    background-repeat: repeat;
    background-color: #fff;
    position: relative;
    min-height: 20rem;
  }
</style>
