import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export default function useAuth() {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [isAuth, setIsAuth] = useState(false);

  const checkLogin = async () => {
    const token = localStorage.getItem("hexToken");
    if (!token) return false;
    // 可加入其他檢查邏輯
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/v2/admin/signin`, account);
      const { token } = res.data;
      localStorage.setItem("hexToken", token);
      // 設定 axios 預設 header 或其他 token 處理
      axios.defaults.headers.common["Authorization"] = token;
      setIsAuth(true);
    } catch (err) {
      alert("登入失敗");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return {
    account,
    setAccount,
    isAuth,
    setIsAuth,
    checkLogin,
    handleLogin,
    handleLogout,
  };
}
