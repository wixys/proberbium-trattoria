<template>
  <div v-if="show">
    <section id="topbar" class="d-flex align-items-center">
      <div class="container d-flex justify-content-center justify-content-md-between">
        <div v-if="companyProfile" class="contact-info d-flex align-items-center">
          <!-- <i class="bi bi-envelope d-flex align-items-center"
                ><a :href="`mailto:${companyProfile.email}`">{{ companyProfile.email }}</a></i
              > -->
          <i class="bi bi-phone d-flex align-items-center ms-4 fs-5"
            ><span
              ><a :href="`tel:${companyProfile?.mobile}`">{{ companyProfile?.mobile }}</a></span
            ></i
          >
        </div>
        <button class="btn btn-light ms-3" @click="goTo">Reserva una cita</button>
        <div class="social-links d-none d-md-flex align-items-center">
          <a
            v-for="(socialNetwork, index) in socialNetworks"
            :key="index"
            :href="socialNetwork.url"
            target="_blank"
            class="instagram"
            ><i :class="socialNetwork.icon" class="fs-5"></i
          ></a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  const router = useRouter();
  const props = defineProps({
    show: {
      type: Boolean,
      default: true,
    },
    companyProfile: {
      type: Object,
    },
    socialNetworks: {
      type: Array,
    },
  });

  // Add funtion to go to this page: /reserva-una-cita
  const goTo = () => {
    router.push('/reserva-una-cita');
  };
</script>

<style scoped>
  .top-navbar {
    height: 59px; /* Define la altura del TopNavbar */
    background-color: #f8f9fa; /* Ejemplo de color de fondo */
    margin-bottom: 0; /* Si no quieres espacio adicional */
  }
</style>
