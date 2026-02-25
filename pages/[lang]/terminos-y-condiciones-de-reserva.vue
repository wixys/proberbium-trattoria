<template>
  <div class="container px-4 px-lg-5 my-5 py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="fw-bolder text-black mb-4">TÉRMINOS Y CONDICIONES DE RESERVA</h1>
        <article class="legal-content lead fw-normal mb-0" v-html="termsReservationHtml"></article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const config = useRuntimeConfig();
  const route = useRoute();
  const langParam = route.params.lang as string | undefined;
  const lang = langParam ? langParam : (config.public.defaultLocale as string);
  const title = 'Términos y condiciones de reserva | ' + config.public.appName;

  const termsReservationHtml = `
    <h2 class="h4 fw-bolder mb-3">1. Identificación del titular</h2>
    <p>En cumplimiento de la normativa vigente, se informa que el titular del establecimiento y del sitio web <a href="https://www.proverbium.es/" target="_blank" rel="noopener">https://www.proverbium.es/</a> es:</p>
    <p><strong>Rosso Maniero S.L.U.</strong><br><strong>CIF:</strong> B86058179<br><strong>Domicilio:</strong> C. de los Mártires, 19, 28660 Boadilla del Monte, Madrid, España</p>
    <p>En adelante, “Proverbium”.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">2. Objeto</h2>
    <p>Los presentes términos y condiciones regulan el proceso de reserva de mesa realizado a través del sitio web de Proverbium o mediante la plataforma externa de reservas utilizada como proveedor tecnológico.</p>
    <p>La realización de una reserva implica la aceptación plena y sin reservas de las presentes condiciones.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">3. Proceso de reserva</h2>
    <p>La reserva se formaliza cuando el usuario:</p>
    <p>Completa los datos solicitados en el formulario de reserva.</p>
    <p>Acepta expresamente la política de privacidad y los presentes términos y condiciones.</p>
    <p>Recibe confirmación de la reserva por los medios facilitados (correo electrónico u otros).</p>
    <p>Proverbium se reserva el derecho a verificar la autenticidad de los datos facilitados y a contactar con el usuario para confirmar la reserva.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">4. Datos facilitados por el usuario</h2>
    <p>El usuario se compromete a facilitar datos veraces, completos y actualizados.</p>
    <p>Proverbium no se hace responsable de incidencias derivadas de errores en los datos proporcionados por el usuario.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">5. Modificación y cancelación de reservas</h2>
    <p>Las reservas podrán modificarse o cancelarse a través de los medios indicados en la confirmación de la reserva.</p>
    <p>En caso de no presentarse en el establecimiento sin cancelación previa (“no show”), Proverbium podrá aplicar las condiciones específicas indicadas en el momento de la reserva, especialmente en caso de haberse solicitado garantía mediante tarjeta o señal económica.</p>
    <p>Proverbium se reserva el derecho de establecer políticas específicas para reservas de grupos, eventos o fechas especiales.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">6. Puntualidad y mantenimiento de la reserva</h2>
    <p>Se ruega puntualidad.</p>
    <p>Proverbium podrá mantener la reserva durante un tiempo razonable desde la hora confirmada. Transcurrido dicho plazo sin aviso por parte del cliente, la mesa podrá quedar liberada.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">7. Derecho de admisión</h2>
    <p>Proverbium se reserva el derecho de admisión conforme a la normativa aplicable.</p>
    <p>No se permitirá el acceso o permanencia en el establecimiento en caso de comportamientos inapropiados, ofensivos o contrarios a las normas básicas de convivencia.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">8. Condiciones especiales</h2>
    <p>En determinadas fechas, eventos o servicios especiales, podrán aplicarse condiciones adicionales que serán informadas previamente al cliente durante el proceso de reserva.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">9. Responsabilidad</h2>
    <p>Proverbium no será responsable de:</p>
    <p>Interrupciones del servicio de reservas por causas técnicas ajenas.</p>
    <p>Errores derivados del mal uso de la plataforma por parte del usuario.</p>
    <p>Fuerza mayor o circunstancias imprevisibles que impidan la prestación del servicio.</p>
    <p>En caso de imposibilidad de prestar el servicio por causas imputables al establecimiento, se ofrecerá alternativa o reprogramación.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">10. Protección de datos</h2>
    <p>Los datos personales facilitados durante el proceso de reserva serán tratados conforme a la política de privacidad publicada en <a href="/${lang}/politica-de-privacidad">Política de privacidad</a>.</p>

    <h2 class="h4 fw-bolder mb-3 mt-4">11. Legislación aplicable y jurisdicción</h2>
    <p>Los presentes términos se rigen por la legislación española.</p>
    <p>En caso de conflicto, las partes se someten a los juzgados y tribunales del domicilio del consumidor, conforme a la normativa vigente en materia de protección de consumidores y usuarios.</p>
  `;

  useHead({
    title,
    meta: [{ property: 'og:locale', content: lang }],
  });
</script>

<style scoped>
  .legal-content p {
    margin-bottom: 1rem;
  }
</style>
