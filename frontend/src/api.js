import axios from "axios"
import { ACCESS_TOKEN,REFRESH_TOKEN } from "./constants"

const api=axios.create({
    baseURL:"https://review-system-wls0.onrender.com/api"
})

api.interceptors.request.use(

    (config)=>{
        const token=localStorage.getItem(ACCESS_TOKEN);

        if(token)
        {
            config.headers.Authorization=`Bearer ${token}`
        }
        return config

    },
    (error)=>{
        return Promise.reject(error)

    }

)

// Login function
export const login = async (credentials) => {
    const response = await api.post('/token/', credentials);
    return response;
};

// Register function
export const register = async (userData) => {
    const formData = new FormData();
    
    // Add all text fields
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('first_name', userData.first_name);
    formData.append('last_name', userData.last_name);
    formData.append('password', userData.password);
    formData.append('confirm_password', userData.confirm_password);
    
    // Add photo if exists
    if (userData.photo) {
        formData.append('photo', userData.photo);
    }
    
    // Debug: Log the data being sent
    console.log("Sending registration data:", {
        username: userData.username,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        has_photo: !!userData.photo,
        password_length: userData.password?.length,
        confirm_password_length: userData.confirm_password?.length
    });
    
    const response = await api.post('/register/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
};

// Logout function
export const logout = () => {
    localStorage.clear()
};

// Get all users (admin only)
export const getUsers = async () => {
    const response = await api.get('/users/');
    return response;
};

// Toggle admin status (admin only)
export const toggleAdmin = async (userId) => {
    const response = await api.post(`/users/${userId}/make_admin/`);
    return response;
};

// Get all products
export const getProducts = async () => {
    const response = await api.get('/products/');
    return response;
};

export default api