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

  const login = async(email, password) => {
    try {
    const {data} =await api.post('/auth/login', { email, password });
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    return data;
    } catch (error) {
      console.error('Error occurred while logging in:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };

  const register = async(name, email, password) => {
    try {
        const {data} = await api.post('/auth/register', { name, email, password });
        setUser(data.user);
        return data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
  };

  const verifyOtp = async() => {

    try {
        const {data} = await api.post('/auth/verify-otp');
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        console.error('OTP verification failed:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

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