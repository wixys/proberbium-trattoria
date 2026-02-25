<template>
  <div>
    <transition name="rgpd-slide-up">
      <section v-if="isBannerVisible" class="rgpd-banner" aria-label="Aviso de cookies">
        <div class="rgpd-banner__content">
          <h3 class="rgpd-banner__title">Ese sitio web utiliza cookies</h3>
          <p class="rgpd-banner__description">
            Usamos cookies necesarias y, con tu permiso, cookies analíticas, de preferencias y de marketing propio para mejorar tu experiencia.
            <NuxtLink :to="policyPath" class="rgpd-banner__link">Política de privacidad</NuxtLink>
          </p>
        </div>
        <div class="rgpd-banner__actions">
          <button class="rgpd-btn rgpd-btn--ghost" type="button" @click="rejectNonEssential">
            Rechazar todo
          </button>
          <button class="rgpd-btn rgpd-btn--light" type="button" @click="reopenPreferences">
            Configurar
          </button>
          <button class="rgpd-btn rgpd-btn--primary" type="button" @click="acceptAll">
            Aceptar todo
          </button>
        </div>
      </section>
    </transition>

    <transition name="rgpd-fade">
      <div
        v-if="isPreferencesOpen"
        class="rgpd-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rgpd-preferences-title"
      >
        <div class="rgpd-modal__backdrop" @click="closePreferences"></div>
        <div class="rgpd-modal__panel">
          <header class="rgpd-modal__header">
            <h3 id="rgpd-preferences-title">Configura tus cookies</h3>
            <button class="rgpd-icon-btn" type="button" @click="closePreferences">Cerrar</button>
          </header>
          <p class="rgpd-modal__description">
            Puedes cambiar tus preferencias en cualquier momento. Las cookies necesarias siempre
            estaran activas.
          </p>

          <div class="rgpd-categories">
            <label class="rgpd-category">
              <span>
                <strong>Necesarias</strong>
                <small>Imprescindibles para el funcionamiento del sitio.</small>
              </span>
              <input type="checkbox" checked disabled />
            </label>

            <label class="rgpd-category">
              <span>
                <strong>Analiticas</strong>
                <small>Nos ayudan a medir y mejorar el sitio web.</small>
              </span>
              <input type="checkbox" v-model="draft.analytics" />
            </label>

            <label class="rgpd-category">
              <span>
                <strong>Preferencias</strong>
                <small>Guardan opciones como idioma o personalización.</small>
              </span>
              <input type="checkbox" v-model="draft.preferences" />
            </label>

            <label class="rgpd-category">
              <span>
                <strong>Marketing</strong>
                <small>Permiten enviarte ofertas y comunicaciones propias del restaurante.</small>
              </span>
              <input type="checkbox" v-model="draft.marketing" />
            </label>

          </div>

          <footer class="rgpd-modal__footer">
            <button class="rgpd-btn rgpd-btn--ghost" type="button" @click="rejectNonEssential">
              Rechazar todo
            </button>
            <button class="rgpd-btn rgpd-btn--light" type="button" @click="acceptAll">
              Aceptar todo
            </button>
            <button class="rgpd-btn rgpd-btn--primary" type="button" @click="save">
              Guardar preferencias
            </button>
          </footer>
        </div>
      </div>
    </transition>

    <button
      v-if="hasConsent"
      class="rgpd-fab"
      type="button"
      aria-label="Gestionar cookies"
      @click="reopenPreferences"
    >
      <img src="/img/security.png" alt="Gestionar cookies" class="rgpd-fab__icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
  const {
    state,
    policyPath,
    hasConsent,
    isBannerVisible,
    isPreferencesOpen,
    acceptAll,
    rejectNonEssential,
    reopenPreferences,
    closePreferences,
    saveCustom,
  } = useRgpdConsent();

  const draft = reactive({
    analytics: false,
    preferences: false,
    marketing: false,
  });

  watch(
    () => state.value.decision,
    (decision) => {
      draft.analytics = decision.analytics;
      draft.preferences = decision.preferences;
      draft.marketing = decision.marketing;
    },
    { immediate: true, deep: true }
  );

  const save = () => {
    saveCustom({ ...draft });
  };
</script>

<style scoped>
  .rgpd-banner {
    position: fixed;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    z-index: 12000;
    background: #fff;
    border: 1px solid #e9ecef;
    border-radius: 0.75rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    padding: 1rem;
    display: grid;
    gap: 1rem;
  }

  .rgpd-banner__title {
    margin: 0 0 0.4rem 0;
    font-size: 1.1rem;
    font-weight: 900;
  }

  .rgpd-banner__description {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.45;
  }

  .rgpd-banner__link {
    white-space: nowrap;
    color: #a16468;
    text-decoration: underline;
  }

  .rgpd-banner__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .rgpd-btn {
    border: 0;
    border-radius: 0.6rem;
    padding: 0.6rem 0.9rem;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .rgpd-btn--primary {
    background: #a16468;
    color: #fff;
  }

  .rgpd-btn--light {
    background: #f1f3f5;
    color: #212529;
  }

  .rgpd-btn--ghost {
    background: transparent;
    color: #495057;
    border: 1px solid #dee2e6;
  }

  .rgpd-modal {
    position: fixed;
    inset: 0;
    z-index: 13000;
    display: grid;
    place-items: center;
  }

  .rgpd-modal__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.42);
  }

  .rgpd-modal__panel {
    position: relative;
    width: min(680px, calc(100vw - 2rem));
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
    background: #fff;
    border-radius: 0.8rem;
    padding: 1.1rem;
  }

  .rgpd-modal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .rgpd-modal__description {
    margin: 0.6rem 0 1rem 0;
  }

  .rgpd-icon-btn {
    border: 0;
    background: transparent;
    color: #6c757d;
    cursor: pointer;
  }

  .rgpd-categories {
    display: grid;
    gap: 0.7rem;
  }

  .rgpd-category {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border: 1px solid #e9ecef;
    border-radius: 0.6rem;
    padding: 0.75rem;
  }

  .rgpd-category small {
    display: block;
    color: #6c757d;
    margin-top: 0.2rem;
  }

  .rgpd-modal__footer {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .rgpd-fab {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    z-index: 11900;
    border: 0;
    border-radius: 999px;
    width: 44px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: #212529;
    cursor: pointer;
  }

  .rgpd-fab__icon {
    width: 22px;
    height: 22px;
    display: block;
  }

  .rgpd-slide-up-enter-active,
  .rgpd-slide-up-leave-active {
    transition: all 0.25s ease;
  }

  .rgpd-slide-up-enter-from,
  .rgpd-slide-up-leave-to {
    transform: translateY(16px);
    opacity: 0;
  }

  .rgpd-fade-enter-active,
  .rgpd-fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .rgpd-fade-enter-from,
  .rgpd-fade-leave-to {
    opacity: 0;
  }

  @media (min-width: 992px) {
    .rgpd-banner {
      left: 2rem;
      right: 2rem;
      bottom: 2rem;
      grid-template-columns: 1fr auto;
      align-items: end;
    }

    .rgpd-banner__actions {
      justify-content: flex-end;
    }
  }
</style>
