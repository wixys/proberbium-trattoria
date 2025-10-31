<template>
  <section class="bg-light">
    <template v-if="error.statusCode == 404">
      <div class="container-fluid">
        <div class="row row-cols-1 justify-content-center py-5">
          <div class="col-xxl-7 mb-4">
            <div class="lc-block">
              <lottie-player
                src="https://assets9.lottiefiles.com/packages/lf20_u1xuufn3.json"
                class="mx-auto"
                background="transparent"
                speed="1"
                loop=""
                autoplay=""
              ></lottie-player>
            </div>
            <!-- /lc-block -->
          </div>
          <!-- /col -->
          <div class="col text-center">
            <div class="lc-block">
              <!-- /lc-block -->
              <div class="lc-block mb-4">
                <div editable="rich">
                  <p class="rfs-11 fw-light">
                    The page you are looking for was moved, removed or might never existed.
                  </p>
                </div>
              </div>
              <!-- /lc-block -->
              <div class="lc-block">
                <button class="btn btn-lg btn-primary" @click="handleClick">
                  Back to homepage
                </button>
              </div>
              <!-- /lc-block -->
            </div>
            <!-- /lc-block -->
          </div>
          <!-- /col -->
        </div>
      </div>
    </template>
    <template v-if="error.statusCode == 500">
      <div class="container text-center">
        <div class="row align-items-center">
          <div class="col-md-6 offset-md-3">
            <h1>Error {{ error.statusCode }}</h1>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup>
  const props = defineProps({
    error: {
      type: Object,
      required: true,
    },
  });

  const handleClick = () => clearError({ redirect: '/' });

  const titleError = computed(() => {
    if (props.error) return `Error ${props.error.statusCode}`;
  });

  useHead({
    title: titleError,
    meta: [
      {
        name: 'description',
        content: 'The page you are looking for was moved, removed or might never existed.',
      },
    ],
  });
</script>
