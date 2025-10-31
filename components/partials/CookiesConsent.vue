<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark" id="staticBackdropLabel">Política de cookies</h5>
        </div>
        <div class="modal-body">
          Este sitio web utiliza cookies propias y de terceros para ofrecerle una experiencia fiable
          y personalizada. Para continuar navegando en el sitio web de {{ config.public.appName }},
          debe aceptar nuestra política de privacidad. Si lo desea, puede consultar toda la
          información haciendo clic en el botón política de cookies.
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#cookiesPolicy"
          >
            Política de cookies
          </button>
          <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Rechazar todo
            </button> -->
          <button
            type="button"
            class="btn btn-success"
            data-bs-dismiss="modal"
            @click="handleClick"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const config = useRuntimeConfig();

  const emit = defineEmits(['cookiesConsentAccepted']);
  const handleClick = () => {
    emit('cookiesConsentAccepted');
  };

  onMounted(() => {
    var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {});
    myModal.show();
  });
</script>
