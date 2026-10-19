const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeaewkpe';

export const submitContactForm = async (data: Record<string, string>) => {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Message could not be sent. Please try again or email directly.');
  }
};