import axiosInstance from "./axios";

export const getSearchHistory = async (page = 1) => {
  try {
    const response = await axiosInstance.get(
      `/store/transactions/service-history/?page=${page}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching search history:", error);
    throw error.response?.data || { message: "Failed to fetch search history" };
  }
};

export const getWalletHistory = async (page = 1) => {
  try {
    const response = await axiosInstance.get(
      `/store/transactions/wallet-history/?page=${page}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching wallet history:", error);
    throw error.response?.data || { message: "Failed to fetch wallet history" };
  }
};
