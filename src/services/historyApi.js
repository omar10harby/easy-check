import axiosInstance from "./axios";

export async function getSearchHistory(page = 1) {
  // ✅ بس نرمي الخطأ - errorHelpers هيتعامل معاه
  const response = await axiosInstance.get(
    `/store/transactions/service-history/?page=${page}`,
  );
  return response.data;
}

export async function getWalletHistory(page = 1) {
  // ✅ بس نرمي الخطأ - errorHelpers هيتعامل معاه
  const response = await axiosInstance.get(
    `/store/transactions/wallet-history/?page=${page}`,
  );
  return response.data;
}