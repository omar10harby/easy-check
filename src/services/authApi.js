import axios from "axios";

export async function login(loginData) {
    const res=await axios.post('/api/login', loginData);
    return res.data;
}
export async function register(registerData) {
    const res=await axios.post('/api/register', registerData);
    if (res.status) {
        throw new Error('Registration failed');
    }
    return res.data;
}