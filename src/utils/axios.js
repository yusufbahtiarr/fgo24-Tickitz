import axios from "axios";

const baseUrl = "http://146.190.102.54:9703";

function http(token = null) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    timeout: 10000,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized - please login again");
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export default http;
