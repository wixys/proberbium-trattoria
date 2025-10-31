<template>
  <button @click="handleClick" :class="class">
    <i :class="icon" v-if="icon"></i>
    {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
  interface BaseButtonProps {
    buttonText: string;
    icon?: string;
    class?: string;
    href?: string;
    to?: string;
    method?: () => void;
    target?: string;
  }

  const router = useRouter();

  // Define props for the component.
  const props = defineProps({
    buttonText: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    class: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
    method: {
      type: Function,
      default: null,
    },
    target: {
      type: String,
      default: '',
    },
  }) as BaseButtonProps;

  const emit = defineEmits(['track']);

  const handleClick = () => {
    // Emitir evento personalizado para el tracking, permitiendo datos dinámicos desde el padre
    emit('track', {
      label: props.buttonText,
      destination: props.to || props.href,
    });

    if (props.method) {
      props.method();
    } else if (props.href) {
      if (props.target === '_blank') {
        window.open(props.href, '_blank');
      } else {
        window.location.href = props.href;
      }
    } else if (props.to) {
      router.push(props.to);
    } else {
      console.warn('No action defined for BaseButton');
    }
  };
</script>
