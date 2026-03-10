import axios from "axios";

// Determine API base URL based on environment
let baseURL = import.meta.env.VITE_API_BASE || "http://localhost:3000";

// If in development mode and env variable not set, use localhost
if (import.meta.env.DEV && !import.meta.env.VITE_API_BASE) {
    baseURL = "http://localhost:3000";
}

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance;