import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://6a59b6b768601fc330ea0135.mockapi.io/',
    headers: { 
        'Content-Type': 'application/json',
    }
    },
);  