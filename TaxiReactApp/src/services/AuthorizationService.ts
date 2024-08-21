import axios from 'axios';
import LoginFormData from '../models/LoginFormData';
import RegisterFormData from '../models/RegisterFormData';
import { addToLocalStorage } from '../util/LocalStorage';

const API_LOGIN_URL = 'http://localhost:8352/api/Gateway/users/login';
const API_REGISTER_URL = 'http://localhost:8352/api/Gateway/users/register';

export const login = async (formData: LoginFormData) => {
    try {
        const response = await axios.post(API_LOGIN_URL, formData);
        const token = response.data.token;
        addToLocalStorage('accessToken', token)
        return response.data; // This should include the user object
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Handle specific error responses
            throw new Error(error.response.data);
        } else {
            throw new Error('An error occurred while logging in.');
        }
    }
};

export const register = async (formData : RegisterFormData) => {
    try {
        const response = await axios.post(API_REGISTER_URL, formData);
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error('An error occurred while registering.');
        }
    }
}
