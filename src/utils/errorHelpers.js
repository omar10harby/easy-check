/**
 * دالة موحدة لاستخراج رسائل الأخطاء من الباك إند
 * تتعامل مع جميع أشكال الأخطاء التي يرسلها Django/DRF
 */
export const getErrorMessage = (error) => {
  // ✅ 1. لو الخطأ جاي كـ string من Redux Thunk
  if (typeof error === 'string') {
    return error;
  }
  
  // ✅ 2. لو مفيش response (Network Error)
  if (!error || !error.response) {
    if (error?.message) return error.message;
    return "Network error. Please check your connection.";
  }
  
  const data = error.response?.data;
  
  // ✅ 3. لو الـ response فاضي
  if (!data) {
    return "Server error. Please try again.";
  }

  // ✅ 4. الشكل البسيط: { "error": "رسالة الخطأ" }
  if (data.error && typeof data.error === 'string') {
    return data.error;
  }
  
  // ✅ 5. DRF Standard: { "detail": "رسالة الخطأ" }
  if (data.detail && typeof data.detail === 'string') {
    return data.detail;
  }

  // ✅ 6. Django Validation Errors - أشكال مختلفة:
  
  // الشكل الأول: { "field_name": ["error message"] }
  // مثال: { "service_details": ["Invalid IMEI checksum"] }
  const firstKey = Object.keys(data)[0];
  
  if (!firstKey) {
    return "An error occurred. Please try again.";
  }
  
  const firstValue = data[firstKey];
  
  // ✅ 6a. Array من الأخطاء
  if (Array.isArray(firstValue) && firstValue.length > 0) {
    return firstValue[0];
  }
  
  // ✅ 6b. Nested Object مثل: { "service_details": { "imei": ["Invalid"] } }
  if (typeof firstValue === 'object' && firstValue !== null && !Array.isArray(firstValue)) {
    const nestedKey = Object.keys(firstValue)[0];
    const nestedValue = firstValue[nestedKey];
    
    if (Array.isArray(nestedValue) && nestedValue.length > 0) {
      return nestedValue[0];
    }
    
    if (typeof nestedValue === 'string') {
      return nestedValue;
    }
    
    // لو Nested Object تاني
    if (typeof nestedValue === 'object' && nestedValue !== null) {
      const deepKey = Object.keys(nestedValue)[0];
      const deepValue = nestedValue[deepKey];
      
      if (Array.isArray(deepValue) && deepValue.length > 0) {
        return deepValue[0];
      }
      if (typeof deepValue === 'string') {
        return deepValue;
      }
    }
  }
  
  // ✅ 6c. String بسيط مثل: { "amount": "Insufficient funds" }
  if (typeof firstValue === 'string') {
    return firstValue;
  }

  // ✅ 7. Fallback للحالات النادرة
  return "An unexpected error occurred.";
};