import axiosInstance from "./axios";



export async function buyWithWallet(imeiOrSerial, serviceId, amount,isSerial=false) {
  const keyName = isSerial ? 'serial' : 'imei';
  try {

    const response = await axiosInstance.post("/store/transactions/", {
      amount: amount.toString(),
      service_details: {
        [keyName]: imeiOrSerial,
        service_id: serviceId,
      },
    });

    return {
      transactionId: response.data.transaction_id,
      transactionStatus: response.data.transaction_status,
      newBalance: response.data.new_balance,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to process transaction";
    throw new Error(message);
  }
}


export async function createTopupPayment(amount) {
  try {


    const response = await axiosInstance.post("/store/transactions/", {
      amount: amount.toString(),
    });

    return {
      transactionId: response.data.transaction_id,
      paymentUrl: response.data.paymentUrl,
      merchantTransactionId: response.data.merchant_transaction_id,
    };
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || "Failed to create payment";
    throw new Error(message);
  }
}


export async function createGuestCheckout(imeiOrSerial, serviceId, amount, isSerial) {
  const keyName = isSerial ? 'serial' : 'imei';
  try {
    const response = await axiosInstance.post("/store/transactions/", {
      amount: amount,
      service_details: {
        [keyName]: imeiOrSerial,
        service_id: serviceId,
      },
    });

    return {
      transactionId: response.data.transaction_id,
      paymentUrl: response.data.paymentUrl,
      merchantTransactionId: response.data.merchant_transaction_id,
    };
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || "Failed to create checkout";
    throw new Error(message);
  }
}