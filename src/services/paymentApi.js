import axiosInstance from "./axios";

export async function buyWithWallet(imeiOrSerial, serviceId, amount, isSerial = false) {
  const keyName = isSerial ? 'serial' : 'imei';

  // ✅ بس نرمي الخطأ - errorHelpers هيتعامل معاه
  const response = await axiosInstance.post("/store/transactions/", {
    amount: amount.toString(),
    service_details: {
      [keyName]: imeiOrSerial,
      service_id: serviceId,
    },
  });

  const data = response.data;
  const apiResult = data.api_result;

  return {
    id: data.transaction_id,
    status: apiResult?.status || data.transaction_status,
    result: apiResult?.result || apiResult || "Processing",
    created_at: new Date().toISOString(),
    amount: amount,
    newBalance: data.new_balance,
  };
}

export async function createTopupPayment(amount) {
  // ✅ بس نرمي الخطأ - errorHelpers هيتعامل معاه
  const response = await axiosInstance.post("/store/transactions/", {
    amount: amount.toString(),
  });

  return {
    transactionId: response.data.transaction_id,
    paymentUrl: response.data.paymentUrl,
    merchantTransactionId: response.data.merchant_transaction_id,
  };
}

export async function createGuestCheckout(imeiOrSerial, serviceId, amount, isSerial, guestEmail) {
  const keyName = isSerial ? 'serial' : 'imei';

  // ✅ بس نرمي الخطأ - errorHelpers هيتعامل معاه
  const response = await axiosInstance.post("/store/transactions/", {
    amount: amount,
    service_details: {
      [keyName]: imeiOrSerial,
      service_id: serviceId,
    },
    guest_email: guestEmail,
  });

  return {
    transactionId: response.data.transaction_id,
    paymentUrl: response.data.paymentUrl,
    merchantTransactionId: response.data.merchant_transaction_id,
  };
}