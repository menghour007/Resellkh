export async function createProduct(formData) {
  const token = localStorage.getItem('authToken'); 

  const response = await fetch('', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}
