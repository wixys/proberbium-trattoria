<template>
  <!-- Navigation-->
  <nav
    :class="[
      'navbar',
      'navbar-expand-lg',
      'navbar-light',
      'fixed-top',
      { 'navbar-margin-top bg-white shadow': navbarMarginTop },
    ]"
    id="mainNav"
  >
    <div class="container-fluid px-lg-5">
      <NuxtLink to="/es" class="navbar-brand"
        ><PartialsLogo :src="logo" :alt="logo" :class="'img-fluid me-3'" :width="'180'"
      /></NuxtLink>
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list fs-5"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto col-lg-8 justify-content-lg-center">
          <li class="nav-item" v-for="item in menuItems" :key="item.link">
            <template v-if="item.type === 'button'">
              <UiButtonsBaseButton
                :to="item.link"
                :buttonText="item.title"
                :icon="item.icon"
                :class="item.btn_class"
                @click="collapseNavbar"
              />
            </template>
            <template v-else>
              <NuxtLink :to="item.link" class="nav-link">{{ item.title }}</NuxtLink>
            </template>
          </li>
        </ul>
        <div class="d-flex justify-content-end">
          <a href="https://lauyama.com/booking" class="btn btn-outline-dark me-2" title="Reservar online" target="_blank"
            ><i class="bi bi-calendar-check me-2"></i> Reserva online</a
          >
        </div>
        <div class="d-flex justify-content-end">
          <a href="tel:916320574" class="btn btn-outline-dark"
            ><i class="bi bi-telephone me-2"></i> 916 32 05 74</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  const props = defineProps({
    isNavbarShrink: {
      type: Boolean,
      default: false,
    },
    navbarMarginTop: {
      type: Boolean,
      default: false,
    },
  });
  const config = useRuntimeConfig();
  const { companyData } = useCompanyData();
  const route = useRoute();
  const lang = route.params.lang || 'es'; // Default to 'en' if no lang param
  const { data: menu } = await useAsyncData('menu', () => queryContent(`/${lang}/menu`).findOne());
  const { data: company, error } = await companyData(lang);

  const menuItems = menu.value.data.attributes.items
    ? menu.value.data.attributes.items.filter((item) => item.position === 'navbar')
    : [];

  const logo = computed(() => {
    return company.value.attributes.logo;
  });

  // Shrink the navbar when page is scrolled
  const navbarShrink = () => {
    const navbarCollapsible = document.querySelector('#mainNav');
    if (!navbarCollapsible) return;

    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink');
      navbarCollapsible.classList.remove('shadow');
    } else {
      navbarCollapsible.classList.add('navbar-shrink');
      navbarCollapsible.classList.add('shadow');
    }
  };

  //  Remove margin-top from navbar when page is scrolled
  const removeNavbarMarginTop = () => {
    const navbarCollapsible = document.querySelector('#mainNav');
    if (!navbarCollapsible) return;

    if (window.scrollY === 0) {
      navbarCollapsible.classList.add('navbar-margin-top');
    } else {
      navbarCollapsible.classList.remove('navbar-margin-top');
    }
  };
  // Collapse the navbar when a link is clicked
  const collapseNavbar = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
      navbarToggler.click();
    }
  };

  onMounted(() => {
    // Shrink the navbar when page is scrolled
    if (props.isNavbarShrink) window.addEventListener('scroll', navbarShrink);
    else if (props.navbarMarginTop) window.addEventListener('scroll', removeNavbarMarginTop);
    // setAsNavbarShrink();

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.querySelector('#mainNav');

    if (mainNav) {
      if (document.querySelector(mainNav.getAttribute('data-bs-target'))) {
        new bootstrap.ScrollSpy(document.body, {
          target: '#mainNav',
          rootMargin: '0px 0px -40%',
        });
      }
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
    );

    responsiveNavItems.map((responsiveNavItem) => {
      responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click();
        }
      });
    });
  });

  onBeforeUnmount(() => {
    // Shrink the navbar when page is scrolled
    if (props.isNavbarShrink) window.addEventListener('scroll', navbarShrink);
  });
</script>

<style>
  a.router-link-active.router-link-exact-active.nav-link {
    color: rgb(0, 93, 166);
    outline: none;
    border-bottom: 0.25rem solid rgb(0, 93, 166);
    z-index: 10000;
  }

  .navbar {
    margin-top: 0; /* Valor inicial del margin-top */
    transition: margin-top 0.5s ease-in-out; /* Transición suave */
  }

  .navbar-margin-top {
    margin-top: 59px;
  }
</style>
