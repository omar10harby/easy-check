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
  const apiResult = data.service_details?.api_result;

  // Determine the actual status - check api_result first, then transaction status
  let effectiveStatus = apiResult?.status;

  // If no api_result status, map transaction status to a status we can use
  if (!effectiveStatus) {
    const transactionStatus = data.status?.toUpperCase();
    if (transactionStatus === 'PENDING') {
      effectiveStatus = 'pending';
    } else if (transactionStatus === 'REFUNDED') {
      effectiveStatus = 'rejected';
    } else if (transactionStatus === 'COMPLETED' || transactionStatus === 'SUCCESS') {
      effectiveStatus = 'success';
    }
  }

  return {
    id: data.id,
    merchantTransactionId: data.merchant_transaction_id,
    status: data.status,
    amount: data.amount,
    serviceDetails: {
      ...data.service_details,
      // Ensure api_result has a status even if it was missing
      api_result: apiResult ? apiResult : { status: effectiveStatus }
    },
    isBalanceTopup: data.is_balance_topup,
    createdAt: data.created_at,
    result: apiResult?.result || apiResult?.status || null,
    sickwOrderId: data.sickw_order_id,
  };
};
