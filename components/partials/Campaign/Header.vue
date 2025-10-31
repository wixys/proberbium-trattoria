<template>
  <!-- Masthead-->
  <header class="masthead">
    <div class="video-container">
      <div
        v-if="!showVideo"
        class="video-placeholder d-flex align-items-center justify-content-center"
      >
        <div class="spinner-border text-light me-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mb-0">Cargando vídeo...</p>
      </div>

      <!-- Video visible después de 2 segundos -->
      <!-- <video v-show="showVideo" ref="video" autoplay muted loop playsinline>
        <source src="/videos/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> -->
      <div class="mute-container">
        <div v-if="isMuted" class="pointer-hand">👇</div>
        <button
          @click="toggleMute"
          type="button"
          class="btn mute-button btn-sm"
          data-bs-toggle="button"
        >
          <span v-if="isMuted"><i class="bi bi-volume-mute fs-3 text-white"></i></span>
          <span v-else><i class="bi bi-volume-up-fill fs-3 text-white"></i></span>
        </button>
      </div>
      <!-- Botón de scroll centrado -->
      <div class="d-flex justify-content-center position-absolute bottom-0 w-100 mb-3">
        <button
          @click="scrollDown"
          class="btn btn-dark transparent-button fw-bold"
          aria-label="Scroll Down"
        >
          Descubre más
        </button>
      </div>
    </div>
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
  const showVideo = ref(false); // Controla la visibilidad del video
  const carouselImages = ref(Array());

  onMounted(() => {
    if (props.images) {
      carouselImages.value = props.images;
      isLoading.value = false;
    }
    // Mostrar el video después de 2 segundos
    setTimeout(() => {
      showVideo.value = true;
    }, 500);
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

  const scrollDown = () => {
    const nextSection = document.querySelector('.next-section'); // Cambia '.next-section' por la clase real de la siguiente sección
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Mutea el video solo si no está muteado
    if (video.value && !video.value.muted) {
      video.value.muted = true;
      isMuted.value = true;
    }
  };
</script>

<style>
  .masthead {
    position: relative;
    width: 100%;
    height: auto;
    padding: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
  }

  .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }

  .video-container video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }

  /* Media query for mobile devices */
  @media (max-width: 767.98px) {
    .video-container {
      margin-top: 0;
    }
  }

  .mute-container {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;
  }

  .mute-button {
    position: relative;
    bottom: 20px;
    left: 0;
    z-index: 10;
    border: none;
    width: 50px;
    height: 50px;
    transition: all 0.3s ease;
  }

  .pointer-hand {
    position: relative;
    bottom: 30px;
    left: 20px;
    font-size: 2rem;
    animation: bounce 1s infinite;
    color: white;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .scroll-button {
    position: absolute;
    bottom: 30px; /* Ajusta la distancia desde la parte inferior */
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
  }

  .scroll-button:hover {
    background-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  }

  /* Ajusta el estilo del ícono */
  .scroll-button i {
    font-size: 1.5rem;
    color: white;
  }

  /* Media query para dispositivos móviles */
  @media (max-width: 767.98px) {
    .scroll-button {
      width: 50px;
      height: 50px;
    }

    .scroll-button i {
      font-size: 1.2rem;
    }
  }

  .transparent-button {
    background-color: rgba(0, 0, 0, 0.4); /* Negro con 70% de opacidad */
    border: none;
  }

  .transparent-button:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Blanco con 80% de opacidad al hacer hover */
    transform: scale(1.1); /* Efecto de zoom */
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6); /* Sombra */
  }

  .video-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;
    background: rgba(0, 0, 0, 0.8);
    font-size: 1.5rem;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  video[v-show='false'] {
    opacity: 0;
  }
</style>
