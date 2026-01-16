export const getErrorMessage = (error) => {
  if (!error || !error.response) return "Network Error or Server Unreachable";
  
  const data = error.response.data;

  // 1. If it's a simple key (e.g. { "error": "Login failed" })
  if (data.error) return data.error;
  if (data.detail) return data.detail;

  // 2. If it's a Validation Error (e.g. { "service_details": ["Invalid IMEI checksum"] })
  // We grab the first key and its first message
  const firstKey = Object.keys(data)[0];
  if (firstKey && Array.isArray(data[firstKey])) {
    return data[firstKey][0]; 
  }
  
  // 3. Fallback for object-style errors like { "amount": "Insufficient funds" }
  if (firstKey && typeof data[firstKey] === 'string') {
    return data[firstKey];
  }

  return "An unexpected error occurred.";
};