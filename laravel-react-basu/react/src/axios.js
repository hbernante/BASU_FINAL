import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('TOKEN');
    router.navigate('/login');
  }
  return Promise.reject(error); // Reject all other errors
});

// Function to update user's location
export const updateLocation = async (latitude, longitude) => {
  try {
    await axiosClient.post('/location', { latitude, longitude });
  } catch (error) {
    throw error.response.data; // Throw meaningful error message
  }
};

// Function to get user's location
export const getLocation = async () => {
  try {
    const response = await axiosClient.get('/location');
    return response.data;
  } catch (error) {
    throw error.response.data; // Throw meaningful error message
  }
};

export default axiosClient;
