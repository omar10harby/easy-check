import axios from './axios';

export const getServices = async () => {
  // ✅ بس نرمي الخطأ - errorHelpers هيتعامل معاه
  const response = await axios.get('/store/services/');
  return response.data;
};

export const getImeiResult = async (resultId) => {
  let response;

  const isGuestTransaction = typeof resultId === 'string' && isNaN(resultId);

  if (isGuestTransaction) {
    response = await axios.get(
      `/store/transactions/show-order/?merchant_transaction_id=${resultId}`
    );
  } else {
    response = await axios.get(`/store/transactions/${resultId}/`);
  }

  const data = response.data;

  // Handle case where api_result is at root (e.g. REFUNDED/REJECTED often) or nested
  const apiResult = data.service_details?.api_result || data.api_result;

  // Normalize serviceDetails to ensure UI doesn't crash
  const serviceDetails = data.service_details || { api_result: apiResult };

  return {
    id: data.id,
    merchantTransactionId: data.merchant_transaction_id,
    status: data.status,
    amount: data.amount,
    serviceDetails: serviceDetails,
    isBalanceTopup: data.is_balance_topup,
    createdAt: data.created_at,
    result: apiResult?.result || apiResult?.status || null,
    sickwOrderId: data.sickw_order_id,
  };
};