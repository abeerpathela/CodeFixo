import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const data = await authService.login({ email, password });
        setUser(data);
        return data;
    };

    const signup = async (name, email, password) => {
        const data = await authService.signup({ name, email, password });
        setUser(data);
        return data;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    // Google login is handled by URL params redirect for now
    const loginWithToken = (token) => {
        // In a real app, you'd fetch the user profile with this token
        // For now, we'll assume the backend redirect handles the user object structure if needed
        // or we fetch /me
        const userData = { token };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        loginWithToken,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
