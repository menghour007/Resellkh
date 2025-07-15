export const postProduct = async (productData) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    // Create URL with query parameters
    const queryParams = new URLSearchParams({
      productName: productData.productName,
      userId: productData.userId,
      mainCategoryId: productData.mainCategoryId,
      productPrice: productData.productPrice,
      discountPercent: productData.discountPercent || 0,
      productStatus: productData.productStatus || 'available',
      description: productData.description || '',
      location: productData.location || '',
      latitude: productData.latitude || 0,
      longitude: productData.longitude || 0,
      condition: productData.condition,
      telegramUrl: productData.telegramUrl || ''
    });

    // Create FormData for files
    const formData = new FormData();
    productData.files.forEach(file => {
      formData.append('files', file);
    });

    // Debug output
    console.log('Request URL:', `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/upload?${queryParams.toString()}`);
    console.log('Files being uploaded:', productData.files.map(f => f.name));

    const response = await fetch(
      `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/upload?${queryParams.toString()}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formData
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Upload failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Upload Error:', {
      message: error.message,
      productData: {
        ...productData,
        files: productData.files.map(f => f.name)
      }
    });
    throw error;
  }
};