import axios from "axios";
import { API_BASE_URL, API_TOKEN } from "../config";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});
