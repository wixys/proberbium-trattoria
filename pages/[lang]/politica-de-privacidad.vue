<template>
  <div class="container px-4 px-lg-5 my-5 py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="fw-bolder text-black mb-4">POLÍTICA DE PRIVACIDAD</h1>
        <article class="legal-content lead fw-normal mb-0" v-html="privacyPolicyHtml"></article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const config = useRuntimeConfig();
  const route = useRoute();
  const langParam = route.params.lang as string | undefined;
  const lang = langParam ? langParam : (config.public.defaultLocale as string);
  const title = 'Política de privacidad | ' + config.public.appName;
  const cookiesPolicyPath = `/${lang}/politica-de-cookies`;
  const privacyPolicyHtml = `
    <h2 class="h4 fw-bolder mb-3">1. Responsable del tratamiento</h2>
    <p>En cumplimiento de lo dispuesto en el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD), se informa que los datos personales facilitados a través del sitio web serán tratados por:</p>
    <p><strong>Titular:</strong> Rosso Maniero S.L.U.<br><strong>CIF:</strong> B86058179<br><strong>Domicilio social:</strong> C. de los Mártires, 19, 28660 Boadilla del Monte, Madrid, España<br><strong>Correo electrónico de contacto:</strong> info@proverbium.es<br><strong>Sitio web:</strong> <a href="https://www.proverbium.es/" target="_blank" rel="noopener">https://www.proverbium.es/</a></p>
    <p>En adelante, el “Responsable”.</p>
    <h2 class="h4 fw-bolder mb-3 mt-4">2. Finalidad del tratamiento</h2>
    <p>Los datos personales recabados a través del sitio web serán tratados con las siguientes finalidades:</p>
    <p>Gestionar solicitudes de información realizadas a través de los formularios de contacto.</p>
    <p>Gestionar reservas realizadas por los usuarios.</p>
    <p>Atender consultas, solicitudes o reclamaciones.</p>
    <p>Enviar comunicaciones comerciales relacionadas con los servicios ofrecidos, en caso de contar con el consentimiento del usuario.</p>
    <p>Cumplir con obligaciones legales aplicables.</p>
    <h2 class="h4 fw-bolder mb-3 mt-4">3. Sistema de reservas</h2>
    <p>El sitio web puede redirigir al usuario a una plataforma externa de reservas accesible en:</p>
    <p><a href="https://www.lauyama.com/es/booking" target="_blank" rel="noopener">https://www.lauyama.com/es/booking</a></p>
    <p>Dicha plataforma actúa exclusivamente como proveedor tecnológico del sistema de reservas.</p>
    <p>Los datos personales introducidos en el proceso de reserva:</p>
    <p>Son tratados bajo la responsabilidad de Rosso Maniero S.L.U.</p>
    <p>No son utilizados para fines propios por parte del proveedor tecnológico.</p>
    <p>Se tratan exclusivamente para la gestión de la reserva solicitada.</p>
    <p>Rosso Maniero S.L.U. ha adoptado las medidas contractuales necesarias para garantizar que el proveedor actúe conforme al RGPD como encargado del tratamiento, asegurando la confidencialidad y seguridad de los datos.</p>
    <h2 class="h4 fw-bolder mb-3 mt-4">4. Legitimación</h2>
    <p>La base jurídica para el tratamiento de los datos es:</p>
    <p>El consentimiento del interesado.</p>
    <p>La ejecución de un contrato o aplicación de medidas precontractuales (gestión de reservas).</p>
    <p>El cumplimiento de obligaciones legales.</p>
    <p>El interés legítimo del Responsable en mejorar sus servicios y atender solicitudes.</p>
    <h2 class="h4 fw-bolder mb-3 mt-4">5. Conservación de los datos</h2>
    <p>Los datos personales se conservarán:</p>
    <p>Durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos.</p>
    <p>Mientras exista una relación contractual.</p>
    <p>Durante los plazos legalmente establecidos para el cumplimiento de obligaciones fiscales, contables o administrativas.</p>
    <p>Hasta que el usuario solicite su supresión cuando el tratamiento esté basado en el consentimiento.</p>
    <h2 class="h4 fw-bolder mb-3 mt-4">6. Destinatarios</h2>
    <p>Los datos podrán ser comunicados a:</p>
    <p>Administraciones públicas cuando sea legalmente obligatorio.</p>
    <p>Proveedores de servicios que actúen como encargados del tratamiento (por ejemplo, servicios tecnológicos, hosting o gestión de reservas).</p>
    <p>No se realizarán transferencias internacionales de datos fuera del Espacio Económico Europeo salvo que se garantice un nivel adecuado de protección conforme a la normativa vigente.</p>
    <h2 class="h4 fw-bolder mb-3 mt-4">7. Derechos del usuario</h2>
    <p>El usuario puede ejercer los siguientes derechos:</p>
    <p>Derecho de acceso.</p>
    <p>Derecho de rectificación.</p>
    <p>Derecho de supresión.</p>
    <p>Derecho de oposición.</p>
    <p>Derecho a la limitación del tratamiento.</p>
    <p>Derecho a la portabilidad de los datos.</p>
    <p>Derecho a retirar el consentimiento en cualquier momento.</p>
    <p>Para ejercer estos derechos, puede enviar una solicitud por escrito a la dirección postal indicada o al correo electrónico facilitado, adjuntando copia de documento identificativo.</p>
    <p>Asimismo, el usuario tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>).</p>
    <h2 class="h4 fw-bolder mb-3 mt-4">8. Seguridad de los datos</h2>
    <p>Rosso Maniero S.L.U. aplica las medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo, evitando la alteración, pérdida, tratamiento o acceso no autorizado a los datos personales.</p>
    <h2 class="h4 fw-bolder mb-3 mt-4">9. Exactitud de los datos</h2>
    <p>El usuario garantiza que los datos aportados son verdaderos, exactos y actualizados, siendo responsable de comunicar cualquier modificación de los mismos.</p>
    <h2 class="h4 fw-bolder mb-3 mt-4">10. Modificaciones</h2>
    <p>El Responsable se reserva el derecho de modificar la presente Política de Privacidad para adaptarla a novedades legislativas o jurisprudenciales. En caso de cambios relevantes, se informará a los usuarios a través del sitio web.</p>
    <h2 class="h4 fw-bolder mb-3 mt-4">11. Política de cookies</h2>
    <p>Para más información sobre el uso de cookies, puedes consultar nuestra <a href="${cookiesPolicyPath}">Política de cookies</a>.</p>
    <h2 class="h4 fw-bolder mb-3 mt-4">12. Términos de reserva</h2>
    <p>Para conocer las condiciones aplicables al proceso de reserva, puedes consultar los <a href="/${lang}/terminos-y-condiciones-de-reserva">Términos y condiciones de reserva</a>.</p>
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
