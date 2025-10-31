<template>
  <div>
    <section v-if="sent" class="mt-5">
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <h4 class="alert-heading text-center">¡Gracias {{ contactName }}!</h4>
        <p>Tu solicitud se ha enviado correctamente.</p>
        <hr />
        <p class="mb-0">En breve nos pondremos en contacto contigo 🚀</p>
      </div>
    </section>
    <form @submit.prevent="handleSubmit">
      <template v-for="field in fields" :key="field.id">
        <label :for="field.id" class="form-label my-2">
          {{ field.label }}
          <span v-if="field.required" class="text-danger">*</span>
        </label>
        <template v-if="field.type === 'select'">
          <select
            :id="field.id"
            class="form-select"
            v-model="form[field.model]"
            :required="field.required"
          >
            <option value="" disabled selected>{{ field.label }}</option>
            <option
              v-for="option in field.options"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </option>
          </select>
        </template>
        <template v-else-if="field.type === 'textarea'">
          <textarea
            :id="field.id"
            class="form-control"
            v-model="form[field.model]"
            :placeholder="field.placeholder"
            :required="field.required"
            :rows="field.rows"
          ></textarea>
        </template>
        <template v-else>
          <input
            :type="field.type"
            :id="field.id"
            :hidden="field.hidden"
            class="form-control"
            v-model="form[field.model]"
            :placeholder="field.placeholder"
            :required="field.required"
          />
        </template>
      </template>
      <div class="form-check my-3">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          v-model="checked"
        />
        <label class="form-check-label" for="flexCheckChecked">
          <small>
            He leído y acepto la
            <NuxtLink to="/es/politica-de-privacidad">política de privacidad.</NuxtLink>
            <span class="text-danger ms-2">*</span>
          </small>
        </label>
        <p class="mt-2"><small>Todos los campos con el asterisco (*) son obligatorios</small></p>
      </div>
      <button
        type="submit"
        class="btn btn-primary my-3"
        title="Estás a un clic de empezar a dar forma a tu evento"
        :disabled="sending || !checked"
      >
        <div v-if="sending" class="spinner-border text-light spinner-border-sm me-2" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        Enviar idea
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
  const apiUrl = '/api/sendEmail/send';
  const emit = defineEmits(['emailSent']);
  const sending = ref(false);
  const sent = ref(false);
  const contactName = ref('');
  const contactEmail = ref('');
  const checked = ref(false);
  const count = ref(7000);

  type FieldValue = string | number | null;

  interface FormFieldOption {
    label: string;
    value: string | number;
    disabled?: boolean;
  }

  interface FormField {
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    model: string;
    value?: FieldValue;
    options?: FormFieldOption[];
    hidden?: boolean;
    required?: boolean;
    rows?: number;
  }

  const props = defineProps<{
    fields: FormField[];
  }>();

  // Define a dynamic type for formData
  type FormData = {
    [key: string]: FieldValue;
  };

  const form = ref<FormData>({});

  watchEffect(() => {
    props.fields.forEach((field) => {
      if (form.value[field.model] === undefined) {
        form.value[field.model] = field.value !== undefined ? String(field.value) : '';
      }
    });
  });

  const sendEmail = async () => {
    const emailData = form.value;
    const { result } = await $fetch(apiUrl, {
      method: 'POST',
      body: emailData,
    });

    sending.value = false;
    sent.value = false;
    return result;
  };

  const sendEmailCopy = async () => {
    contactName.value = form.value.contactName as string;
    contactEmail.value = form.value.email as string;

    const emailData = {
      subject: '¡Horus Eventos te da las gracias por contactarnos!',
      message: `Hola ${contactName.value},<br><br>
Revisaremos todos los detalles que nos has enviado. Queremos asegurarnos de que cada detalle esté perfectamente alineado con lo que imaginas y poder ayudarte a hacer realidad tu evento.<br><br>
Mientras tanto, si te surge cualquier pregunta o quieres contarnos algo más, aquí estamos, listos para ayudarte.<br><br>
Te responderemos lo antes posible.<br>
Un saludo muy cordial<br><br>El equipo de Horus Eventos<br>+34 917 824 563<br>info@horuseventos.com`,
      brandName: 'Horus Eventos',
      to: contactEmail.value,
      emailFrom: 'info@horuseventos.com',
      logo: 'https://www.horuseventos.com/img/logo.png',
    };

    await $fetch('/api/sendEmail/copy', {
      method: 'POST',
      body: emailData,
    });

    // return result;
  };

  const handleSubmit = async () => {
    sending.value = true;
    contactName.value = form.value.contactName as string;
    try {
      const result = await sendEmail();
      if (result) {
        console.log('Email sent successfully:', result);
        await sendEmailCopy();
      } else {
        console.error('Failed to send email');
      }
      resetForm();
      sent.value = true;
      emit('emailSent');
      setTimeout(function () {
        if (sent.value) {
          sent.value = false;
        }
      }, count.value); // Reset after 7 seconds
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const resetForm = () => {
    props.fields.forEach((field) => {
      form.value[field.model] = ''; // Reset each field to an empty string
    });
  };
</script>
