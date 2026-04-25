import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Декодируем JWT токен
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({ username: payload.sub });
            } catch (error) {
                console.error('Invalid token', error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            const data = response.data;
            
            if (data.success && data.token) {
                localStorage.setItem('token', data.token);
                setUser({ username: data.username, role: data.role });
                toast.success('Вход выполнен успешно!');
                return true;
            } else {
                toast.error(data.error || 'Ошибка входа');
                return false;
            }
        } catch (error) {
            toast.error('Ошибка сервера');
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            const data = response.data;
            
            if (data.success) {
                toast.success('Регистрация успешна! Теперь войдите.');
                return true;
            } else {
                toast.error(data.error || 'Ошибка регистрации');
                return false;
            }
        } catch (error) {
            toast.error('Ошибка сервера');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.success('Выход выполнен');
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, hasRole, loading }}>
            {children}
        </AuthContext.Provider>
    );
};