import * as SecureStore from 'expo-secure-store';
import axios from "axios";

const axiosDefault = axios.create({
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosDefault.interceptors.request.use(
    async reqConfig => {
        const token = await SecureStore.getItemAsync('access_token');

        if (token) reqConfig.headers.authorization = `Bearer ${token}`;
        
        reqConfig.baseURL = 'http://10.0.2.2:3000/api';
        return reqConfig
    }, err => {
        Promise.reject(err)
    }
)

export default axiosDefault;