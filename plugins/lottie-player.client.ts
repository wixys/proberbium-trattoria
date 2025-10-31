// plugins/lottie-player.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
    script.async = true;
    document.head.appendChild(script);
  }
});
