import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost/bus_ticketing_backend/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
