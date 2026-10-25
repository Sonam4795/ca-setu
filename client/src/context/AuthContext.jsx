import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ca_setu_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Verify session on mount with backend if token exists
  useEffect(() => {
    const token = localStorage.getItem('ca_setu_token');
    if (token) {
      authAPI
        .getMe()
        .then((res) => {
          if (res.data?.success && res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem('ca_setu_user', JSON.stringify(res.data.user));
          }
        })
        .catch(() => {
          // If token expired on server, clear
          // But retain user if server is unreachable
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    try {
      const res = await authAPI.login(normalizedEmail, password);
      if (res.data?.success && res.data?.token) {
        const { token, user: userData } = res.data;
        localStorage.setItem('ca_setu_token', token);
        localStorage.setItem('ca_setu_user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      }
    } catch (apiError) {
      // If server error response received from API
      if (apiError.response?.data?.message) {
        return {
          success: false,
          message: apiError.response.data.message,
        };
      }
      
      // Graceful offline fallback during transition/seeding
      const savedUsersDb = JSON.parse(localStorage.getItem('ca_setu_users_db') || '[]');
      const matched = savedUsersDb.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (matched && matched.password === password) {
        localStorage.setItem('ca_setu_token', 'offline-token-' + matched.id);
        localStorage.setItem('ca_setu_user', JSON.stringify(matched));
        setUser(matched);
        return { success: true, user: matched };
      }

      return {
        success: false,
        message: apiError.message || 'Unable to connect to authentication server.',
      };
    }
  };

  const register = async ({ name, email, password, role, phone, companyName, frn }) => {
    const normalizedEmail = email.trim().toLowerCase();

    // Guard: Prevent admin registration on client
    if (role === 'admin') {
      return { success: false, message: 'Admin accounts cannot be registered publicly.' };
    }

    try {
      const res = await authAPI.register({
        name,
        email: normalizedEmail,
        password,
        role: role || 'student',
        phone,
        companyName,
        frn,
      });

      if (res.data?.success && res.data?.token) {
        const { token, user: userData } = res.data;
        localStorage.setItem('ca_setu_token', token);
        localStorage.setItem('ca_setu_user', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      }
    } catch (apiError) {
      if (apiError.response?.data?.message) {
        return {
          success: false,
          message: apiError.response.data.message,
        };
      }

      // Offline fallback
      const newUser = {
        id: 'usr-' + Date.now(),
        name,
        email: normalizedEmail,
        password, // saved only in offline fallback
        role: role || 'student',
        phone: phone || '',
        caStage: role === 'student' ? 'Inter' : undefined,
        groupsCleared: role === 'student' ? 'Both Groups' : undefined,
        companyName: role === 'employer' ? companyName : undefined,
      };

      const savedUsersDb = JSON.parse(localStorage.getItem('ca_setu_users_db') || '[]');
      savedUsersDb.push(newUser);
      localStorage.setItem('ca_setu_users_db', JSON.stringify(savedUsersDb));
      localStorage.setItem('ca_setu_token', 'offline-token-' + newUser.id);
      localStorage.setItem('ca_setu_user', JSON.stringify(newUser));
      setUser(newUser);
      return { success: true, user: newUser };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ca_setu_token');
    localStorage.removeItem('ca_setu_user');
  };

  const updateStudentProfile = (profileData) => {
    if (!user) return;
    const updated = { ...user, ...profileData };
    setUser(updated);
    localStorage.setItem('ca_setu_user', JSON.stringify(updated));
    return { success: true, user: updated };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isStudent: user?.role === 'student',
        isEmployer: user?.role === 'employer',
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateStudentProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
