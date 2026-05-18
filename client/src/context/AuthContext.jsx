import axios from 'axios';
import React from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {

    try {

        const { data } = await axios.post(
            'http://localhost:5003/api/auth/login',
            { email, password }
        );

        setUser(data);

        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);

        return data;

    } catch (error) {

        console.log(error.response?.data);

        throw new Error(
            error.response?.data?.message || 'Login failed'
        );
    }
};

  const register = async(name, email, password) => {
    try {
        const {data} = await axios.post('http://localhost:5003/api/auth/register', { name, email, password });
        setUser(data.user);
        return data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
  };

  const verifyOtp = async (email, otp) => {

    try {

        const { data } = await axios.post(
            'http://localhost:5003/api/auth/verify-otp',
            {
                email,
                otp
            }
        );

        setUser(data);

        localStorage.setItem(
            'user',
            JSON.stringify(data)
        );

        localStorage.setItem(
            'token',
            data.token
        );

        return data;

    } catch (error) {

        console.log(
            error.response?.data
        );

        throw new Error(
            error.response?.data?.message
            || 'OTP verification failed'
        );

    }

};
const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

  return (
    <AuthContext.Provider value={{ user, loading, login, register, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};