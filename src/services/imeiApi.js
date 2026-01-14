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

export const runSickwTest = async () => {
  try {
    const response = await axios.get("store/transactions/test-sickw-demo/");
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Network Error" };
  }
}

export const getImeiResult = async (resultId) => {
  try {
    const response = await axios.get(`/store/transactions/${resultId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching IMEI result:', error);
    throw error.response?.data || { message: 'Failed to fetch result' };
  }
};

