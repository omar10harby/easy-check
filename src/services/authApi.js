import axiosInstance from "./axios";
import Cookies from "js-cookie";

export function saveAuthToken(token) {
  try {
    Cookies.set("auth_token", token, {
      expires: 7,
      secure: false,
      sameSite: "Lax",
    });
    return true;
  } catch {
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
    if (!token) return null;

    const response = await axiosInstance.get("/users/user_info/");
    return {
      id: response.data.user_id,
      username: response.data.username,
      phone_number: response.data.phone_number,
      balance: parseFloat(response.data.balance),
      created_at: response.data.created_at,
    };
  } catch {
    removeAuthToken();
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