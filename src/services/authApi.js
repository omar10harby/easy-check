import axiosInstance from "./axios";
import Cookies from "js-cookie";

export function saveAuthToken(token) {
  try {
    const cookieOptions = {
      expires: 7,
      secure: window.location.protocol === 'https:', // ✅ أضمن
      sameSite: 'Lax',
      domain: window.location.hostname.includes('shaikly.com') 
        ? '.shaikly.com'  // ✅ اشتغل على كل الـ subdomains
        : undefined
    };
    
    Cookies.set("auth_token", token, cookieOptions);
    
    // ✅ تأكد إن الـ Cookie اتحفظت
    const saved = Cookies.get("auth_token");
    console.log('🍪 Token saved:', !!saved);
    
    return !!saved;
  } catch (error) {
    console.error('❌ Failed to save token:', error);
    return false;
  }
}

export function getAuthToken() {
  return Cookies.get("auth_token") || null;
}

export function removeAuthToken() {
  Cookies.remove("auth_token");
  return true;
}

export async function register({ phone_number, password, confirm_password }) {
  // ✅ بس نرمي الخطأ - errorHelpers هيتعامل معاه
  const response = await axiosInstance.post("users/register/", {
    phone_number,
    password,
    confirm_password,
  });
  return response.data;
}

export async function login({ phone_number, password }) {
  // ✅ بس نرمي الخطأ - errorHelpers هيتعامل معاه
  const response = await axiosInstance.post("/login/", {
    username: phone_number,
    password,
  });

  if (response.data.token) {
    saveAuthToken(response.data.token);
  }

  return {
    id: response.data.user_id,
    username: response.data.username,
    phone_number: response.data.phone_number,
    balance: parseFloat(response.data.balance),
    created_at: response.data.created_at,
  };
}

export async function verifyAuth() {
  try {
    const token = getAuthToken();
    
    // ✅ Debug logs
    console.log('🔐 Verifying auth...');
    console.log('🔑 Token exists:', !!token);
    
    if (!token) {
      console.warn('⚠️ No token found');
      return null;
    }

    const response = await axiosInstance.get("/users/user_info/");
    
    console.log('✅ User verified:', response.data);
    
    return {
      id: response.data.user_id,
      username: response.data.username,
      phone_number: response.data.phone_number,
      balance: parseFloat(response.data.balance),
      created_at: response.data.created_at,
    };
  } catch (error) {
    console.error('❌ Verify auth failed:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    
    // ✅ مسح الـ token بس لو 401
    if (error.response?.status === 401) {
      console.warn('🔓 Token expired or invalid - logging out');
      removeAuthToken();
    }
    
    return null;
  }
}

export async function logout() {
  try {
    const token = getAuthToken();
    if (token) {
      await axiosInstance.post("/users/logout/");
    }
  } catch {
    // Silent fail - user will be logged out locally anyway
  } finally {
    removeAuthToken();
  }
  return true;
}