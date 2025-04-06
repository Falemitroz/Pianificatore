import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {createExpense} from "../services/api";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { id: null, email: null };
  });

  const [token, setToken] = useState(localStorage.getItem("token"));
  const baseURL = "http://localhost:5001/auth";

  const navigate = useNavigate();

  // Verifica se il token è ancora valido
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp > Date.now() / 1000) {
          setUser(JSON.parse(localStorage.getItem("user")) || { id: null, email: null });
        } else {
          logout();
        }
      } catch (error) {
        console.error("Errore nella decodifica del token:", error);
        logout();
      }
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${baseURL}/login`, { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({ id: res.data.id, email: res.data.email }));
        setToken(res.data.token);
        setUser({ id: res.data.id, email: res.data.email });
      }
    } catch (error) {
        console.error("Errore durante il login:", error);
      throw error;
    }
  };

  const signup = async (nome, email, password) => {
    try {
      const res = await axios.post(`${baseURL}/signup`, { nome, email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setUser({ id: res.data.id, email: res.data.email });
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${baseURL}/logout`, {}, { withCredentials: true });
  
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
      setUser({ id: null, email: null });
      navigate("/");
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }


  };

  const handleAction = async (action, ...args) => {
    try {
        return await action(...args);
    } catch (error) {
      console.error(`Errore durante l'operazione su task:`, error);
      throw error;
    }
  };

  const values = {
    user,
    login,
    signup,
    logout,
    createExpense: (expenseData) => handleAction(createExpense, expenseData),
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
