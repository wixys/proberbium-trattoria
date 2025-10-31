export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig();
  const defaultLocale = config.public.defaultLocale;

  if (process.server || !to.path) return;

  // Si la ruta es la raíz y no hay un middleware adicional que la gestione
  if (to.path === '/') {
    // No redirigimos; dejamos que se cargue la página raíz
    return;
  }

  // Si no estamos en la raíz, dejamos que i18n maneje las rutas locales
  if (!to.path.startsWith(`/${defaultLocale}`)) {
    return navigateTo(`/${defaultLocale}${to.path}`);
  }
});
