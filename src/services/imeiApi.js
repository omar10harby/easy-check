import axios from './axios';

export const getServices = async () => {
  try {
    const response = await axios.get('/store/services/');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error.response?.data || { message: 'Failed to fetch services' };
  }
};

export const getTransactionByMerchantId = async (merchantOrderId) => {
  try {
    const response = await axios.get(
      `/store/transactions/show-order/?merchant_transaction_id=${merchantOrderId}`
    );
    
    const data = response.data;
    return {
      id: data.id,
      merchantTransactionId: data.merchant_transaction_id,
      status: data.status,
      amount: data.amount,
      serviceDetails: data.service_details,
      isBalanceTopup: data.is_balance_topup,
      createdAt: data.created_at,
      result: data.result, 
    };
  } catch (error) {
    console.error('Error fetching transaction by merchant ID:', error);
    throw error.response?.data || { message: 'Failed to fetch transaction' };
  }
};


export const getImeiResult = async (resultId) => {
  try {
    const response = await axios.get(`/store/transactions/${resultId}/`);
    
    // ✅ Transform response
    const data = response.data;
    return {
      id: data.id,
      merchantTransactionId: data.merchant_transaction_id,
      status: data.status,
      amount: data.amount,
      serviceDetails: data.service_details,
      isBalanceTopup: data.is_balance_topup,
      createdAt: data.created_at,
      result: data.result, 
      sickwOrderId: data.sickw_order_id,
    };
  } catch (error) {
    console.error('Error fetching IMEI result:', error);
    throw error.response?.data || { message: 'Failed to fetch result' };
  }
};
