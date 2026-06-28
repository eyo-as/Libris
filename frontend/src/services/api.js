import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Seamlessly process your backend AppError formats
api.interceptors.response.use(
  (response) => response, // Directly forward successful responses
  (error) => {
    let fallbackMessage = "Something went wrong. Please try again later.";

    // 1. Check if backend replied with your AppError structure
    if (error.response) {
      const serverMessage = error.response.data?.message;
      const status = error.response.status;

      // Automatically clear local session on authorization issues (401)
      if (status === 401) {
        localStorage.removeItem("token");
        // Prevent infinite loops if user is already on login page
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login?expired=true";
        }
      }

      // Overwrite fallback with the clean text extracted from AppError
      fallbackMessage =
        serverMessage || `Server returned error status: ${status}`;
    }
    // 2. Check if server is completely offline/unreachable
    else if (error.request) {
      fallbackMessage =
        "Unable to connect to the server. Please check your network connection.";
    }

    // Pass the clean string message to the catch block
    return Promise.reject(fallbackMessage);
  },
);

export default api;
