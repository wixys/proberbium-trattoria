<template>
  <div class="container px-4 px-lg-5 my-5 py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="fw-bolder text-black mb-4">POLÍTICA DE COOKIES</h1>
        <article class="legal-content lead fw-normal mb-0" v-html="cookiesPolicyHtml"></article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const config = useRuntimeConfig();
  const route = useRoute();
  const langParam = route.params.lang as string | undefined;
  const lang = langParam ? langParam : (config.public.defaultLocale as string);
  const title = 'Política de cookies | ' + config.public.appName;

  const cookiesPolicyHtml = `
    <h2 class="h4 fw-bolder mb-3">1. ¿Qué son las cookies?</h2>
    <p>El sitio web <a href="https://www.proverbium.es/" target="_blank" rel="noopener">https://www.proverbium.es/</a> (en adelante, el “Sitio Web”) utiliza cookies y tecnologías similares para mejorar la experiencia del usuario, analizar el uso del sitio y, en su caso, mostrar contenido personalizado.</p>
    <p>Las cookies son pequeños archivos de texto que se descargan en el dispositivo del usuario al acceder a determinadas páginas web y que permiten almacenar y recuperar información sobre la navegación realizada.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">2. Identificación del responsable</h2>
    <p><strong>Titular:</strong> Rosso Maniero S.L.U.<br><strong>CIF:</strong> B86058179<br><strong>Domicilio:</strong> C. de los Mártires, 19, 28660 Boadilla del Monte, Madrid, España<br><strong>Sitio web:</strong> <a href="https://www.proverbium.es/" target="_blank" rel="noopener">https://www.proverbium.es/</a><br><strong>Email de contacto:</strong> info@proverbium.es</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">3. Tipos de cookies utilizadas</h2>
    <p>El Sitio Web puede utilizar las siguientes categorías de cookies:</p>
    <p><strong>a) Cookies técnicas (necesarias)</strong></p>
    <p>Permiten la navegación a través del Sitio Web y la utilización de las diferentes opciones o servicios que en él existen, incluyendo:</p>
    <p>Control del tráfico y comunicación de datos.</p>
    <p>Identificación de sesión.</p>
    <p>Gestión del proceso de reserva.</p>
    <p>Acceso a partes de acceso restringido.</p>
    <p>Estas cookies no requieren consentimiento del usuario.</p>
    <p><strong>b) Cookies de análisis</strong></p>
    <p>Permiten el seguimiento y análisis del comportamiento de los usuarios en el Sitio Web, con el fin de mejorar la experiencia y optimizar los servicios ofrecidos.</p>
    <p>Ejemplo habitual: Google Analytics (si se utiliza).</p>
    <p>Estas cookies requieren el consentimiento del usuario.</p>
    <p><strong>c) Cookies de personalización</strong></p>
    <p>Permiten recordar información para que el usuario acceda al servicio con determinadas características (idioma, configuración regional, etc.).</p>
    <p><strong>d) Cookies de terceros</strong></p>
    <p>El Sitio Web puede integrar servicios de terceros, como el sistema de reservas accesible en <a href="https://www.lauyama.com/es/booking" target="_blank" rel="noopener">https://www.lauyama.com/es/booking</a>.</p>
    <p>En caso de que dicho sistema utilice cookies propias, estas serán gestionadas bajo su propia política de cookies, sin perjuicio de que los datos derivados de las reservas sean tratados bajo la responsabilidad de Rosso Maniero S.L.U.</p>
    <p>Se recomienda al usuario consultar la política de cookies del proveedor externo cuando acceda a dicha plataforma.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">4. Base jurídica</h2>
    <p>El uso de cookies no necesarias se basa en el consentimiento informado del usuario, otorgado mediante el banner o panel de configuración habilitado al acceder al Sitio Web.</p>
    <p>El usuario puede aceptar, rechazar o configurar las cookies en cualquier momento.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">5. Cómo configurar o desactivar las cookies</h2>
    <p>El usuario puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo mediante la configuración de su navegador:</p>
    <p>Google Chrome</p>
    <p>Mozilla Firefox</p>
    <p>Safari</p>
    <p>Microsoft Edge</p>
    <p>La desactivación de determinadas cookies puede afectar al correcto funcionamiento del Sitio Web.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">6. Conservación de datos</h2>
    <p>Las cookies se conservarán durante el tiempo necesario para cumplir su finalidad específica o hasta que el usuario las elimine manualmente desde su navegador.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">7. Actualizaciones de la política de cookies</h2>
    <p>Rosso Maniero S.L.U. puede modificar esta Política de Cookies en función de nuevas exigencias legislativas o con la finalidad de adaptar dicha política a instrucciones dictadas por la Agencia Española de Protección de Datos.</p>
    <p>Cuando se produzcan cambios significativos, se informará a los usuarios a través del Sitio Web.</p>
  `;

  useHead({
    title: title,
    meta: [{ property: 'og:locale', content: lang }],
  });
</script>

<style scoped>
  .legal-content p {
    margin-bottom: 1rem;
  }
</style>
