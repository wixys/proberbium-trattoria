<template>
  <div class="container-fluid header-bg wow fadeIn" data-wow-delay="0.1s">
    <div class="container pt-5 pb-2">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li
            v-for="(crumb, index) in breadcrumbs"
            :key="index"
            :class="['breadcrumb-item', { active: index === breadcrumbs.length - 1 }]"
          >
            <NuxtLink v-if="index < breadcrumbs.length - 1" :to="crumb.link">
              {{ crumb.title }}
            </NuxtLink>
            <span v-else>{{ crumb.title }}</span>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { menuData } = useMenuData();
  const route = useRoute();
  const lang = route.params.lang || 'en'; // Default to 'en' if no lang param

  const { data: menuItems, error } = await menuData(lang);

  const findBreadcrumbs = (items, path) => {
    for (const item of items) {
      if (item.link === path) {
        return [item];
      }
      if (item.children) {
        const childPath = findBreadcrumbs(item.children, path);
        if (childPath.length) {
          return [item, ...childPath];
        }
      }
    }
    return [];
  };
  // const findBreadcrumbs = (items, path) => {
  //   for (const item of items) {
  //     const itemPath = decodeURI(item.link).replace(/\/$/, '');
  //     const targetPath = decodeURI(path).replace(/\/$/, '');

  //     if (itemPath === targetPath) {
  //       return [item];
  //     }
  //     if (item.children) {
  //       const childPath = findBreadcrumbs(item.children, path);
  //       if (childPath.length) {
  //         return [item, ...childPath];
  //       }
  //     }
  //   }
  //   return [];
  // };

  const breadcrumbs = computed(() => {
    if (!menuItems.value) return [];

    const paths = route.path.split('/').filter((path) => path);
    let currentPath = '';
    const crumbs = [];

    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const breadcrumbPath = findBreadcrumbs(menuItems.value, currentPath);

      if (breadcrumbPath.length) {
        const lastCrumb = crumbs[crumbs.length - 1];
        const newCrumb = breadcrumbPath[breadcrumbPath.length - 1];
        if (!lastCrumb || lastCrumb.link !== newCrumb.link) {
          crumbs.push(newCrumb);
        }
      }
    });

    // Si el último breadcrumb no coincide con la ruta actual, añadimos el segmento final
    if (crumbs.length && route.path !== crumbs[crumbs.length - 1].link) {
      const segments = route.path.split('/').filter(Boolean);
      const lastSegment = segments[segments.length - 1];
      const title = decodeURIComponent(lastSegment)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitaliza

      crumbs.push({
        title,
        link: route.path,
      });
    }

    return crumbs;
  });
</script>

<style scoped>
  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin-top: 3rem;
    list-style: none;
    background-color: transparent;
    background-size: cover;
    border-radius: 0.25rem;
    font-size: 1.2rem;
  }

  .breadcrumb-item + .breadcrumb-item::before {
    content: ' / ';
  }

  .breadcrumb-item.active {
    color: #6c757d;
  }

  .header-bg {
    background: linear-gradient(rgba(250, 248, 248, 0.7), rgba(249, 248, 248, 0.4)),
      url('/img/pattern_waves.png') center center no-repeat;
    background-size: cover;
  }
</style>
