import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true,
});

// Add a request interceptor to handle token
apiRequest.interceptors.request.use(
  (config) => {
    // Get token from cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiRequest;

export const getAdminStats = async () => {
  const response = await apiRequest.get('/admin/stats');
  return response.data;
};

export const getAdminBookings = async () => {
  const response = await apiRequest.get('/admin/bookings');
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await apiRequest.get('/admin/users');
  return response.data;
};

export const getAdminProperties = async () => {
  const response = await apiRequest.get('/admin/properties');
  return response.data;
};