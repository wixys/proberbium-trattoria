import { readBody } from 'h3';

export default defineEventHandler(async (H3Event) => {
  const { apiSendEmailNetxysURL } = useRuntimeConfig(H3Event);
  const method = H3Event.req.method;

  if (method !== 'POST') {
    return { status: 'error', message: 'Unsupported method.' };
  }

  const dataEmail = await readBody(H3Event);

  if (method === 'POST') {
    try {
      const response = await fetch(apiSendEmailNetxysURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataEmail),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { status: 'error', message: errorData.message || 'Failed to send email.' };
      }

      const result = await response.json();

      return { result };
    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Unexpected error occurred.' };
    }
  }
});
