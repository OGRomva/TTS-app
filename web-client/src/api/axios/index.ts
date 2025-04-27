import axios from 'axios';
import { SERVER_BASE_URL } from 'config';

export const API_URL = SERVER_BASE_URL

export const $api = axios.create({
    baseURL: API_URL,
})