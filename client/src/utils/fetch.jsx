import axios from "axios";

export const authFetch = axios.create({
  baseURL: "/api/v1",
});
