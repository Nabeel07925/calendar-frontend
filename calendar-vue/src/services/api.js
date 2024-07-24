import axios from "axios";
import {BASE_URL} from "@/constants/api_endpoints.js";

export const api = axios.create({
    baseURL: BASE_URL
});