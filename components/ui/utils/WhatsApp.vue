<template>
  <div>
    <a :href="`https://wa.me/${mobileNumber}`" target="_blank" class="whatsapp-icon"
      ><i class="bi bi-whatsapp"></i
    ></a>
  </div>
</template>

<script setup>
  const route = useRoute();
  const { companyData } = useCompanyData();
  const lang = route.params.lang || 'es'; // Default to 'en' if no lang param
  // Get company data
  const { data: company, error } = await companyData(lang);

  const mobileNumber = computed(() => {
    if (!company.value) return '';
    return company.value.attributes.mobile.replace(/\s+/g, '');
  });
</script>

<style scoped>
  .whatsapp-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    font-size: 30px; /* Ajusta según sea necesario para el tamaño del icono */
    width: 50px; /* Ancho del botón */
    height: 50px; /* Altura del botón */
    line-height: 50px; /* Alineación vertical del icono */
    text-align: center; /* Alineación horizontal del icono */
    background-color: #25d366;
    color: white;
    border-radius: 50%; /* Esto hará que el botón sea completamente redondo */
    padding: 0; /* Ajusta o elimina el padding */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }

  .whatsapp-icon:hover {
    background-color: #208e49;
  }
</style>
