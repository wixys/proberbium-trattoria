<template>
  <!-- Footer Start -->
  <footer class="footer bg-dark small text-white-50">
    <div class="container-fluid text-light wow fadeIn" data-wow-delay="0.1s">
      <div class="container py-2">
        <div class="row g-5">
          <div class="col-lg-3 col-md-6">
            <NuxtLink to="/es" class="navbar-brand"
              ><PartialsLogo :src="logo" :alt="logo" :class="'img-fluid pb-5'" :width="'180'"
            /></NuxtLink>
          </div>
        </div>
        <div class="row g-5">
          <div class="col-lg-3 col-md-6">
            <h5 class="text-light mb-4">Dirección</h5>
            <p class="mb-2"><i class="bi bi-geo-alt me-2"></i> {{ company.attributes.address }}</p>
            <p class="mb-2">
              <i class="bi bi-telephone me-2"></i>
              <a :href="`tel:${company.attributes.phone}`"> {{ company.attributes.phone }}</a>
            </p>
            <p class="mb-2">
              <i class="bi bi-envelope me-2"></i>
              <a :href="`mailto:${company.attributes.email}`"> {{ company.attributes.email }}</a>
            </p>
            <div class="d-flex pt-2">
              <a
                v-for="social in company.attributes.socialNetworks"
                :href="social.url"
                target="_blank"
                ><i :class="social.icon"></i
              ></a>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="text-light mb-4">Enlaces</h5>
            <nav>
              <ul class="list-unstyled">
                <li v-for="item in menuItems" :key="item.link">
                  <NuxtLink :to="item.link">{{ item.title }}</NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="copyright">
          <div class="row">
            <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; Copyright {{ currentDate }} {{ company.attributes.companyName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- Footer End -->
</template>

<script setup>
  const config = useRuntimeConfig();
  const route = useRoute();
  const { companyData } = useCompanyData();
  const lang = route.params.lang || 'es'; // Default to 'en' if no lang param
  const { data: menu } = await useAsyncData('menu', () => queryContent(`/${lang}/menu`).findOne());
  // Get company data
  const { data: company, error } = await companyData(lang);

  const currentDate = new Date().getFullYear();

  const menuItems = menu.value.data.attributes.items ? menu.value.data.attributes.items : [];

  const logo = computed(() => {
    return config.public.baseUrl + company.value.attributes.logo;
  });
</script>
