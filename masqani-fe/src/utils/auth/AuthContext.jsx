import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axiosInstance from '../http/AxiosInstance';
import { environment } from '../../service/environment/environment';
import { jwtDecode } from 'jwt-decode';
import { replace, useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      validateToken(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await axiosInstance.post(`${environment.apiUrl}/auth/validate-token`, {accessToken:token},{
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Validate token response:", response);
      if (response.data === true) {
        const decodedToken = jwtDecode(token);
        setUser({
          id: decodedToken.userId,
          email: decodedToken.sub,
          publicId: decodedToken.publicId,
          authorities: decodedToken.authorities
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post(`${environment.apiUrl}/auth/signin`, { email, password });
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const decodedToken = jwtDecode(accessToken);

      setUser({
        id: decodedToken.userId,
        email: decodedToken.sub,
        publicId: decodedToken.publicId,
        authorities: decodedToken.authorities
      });

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const oauthLogin = (accessToken, refreshToken) => {

    console.log("oauth login trigger");
    
    const decodedToken = jwtDecode(accessToken);

    console.log("decoded oauth token", decodedToken);
    

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    setUser({
      id: decodedToken.userId,
      email: decodedToken.sub,
      publicId: decodedToken.publicId,
      authorities: decodedToken.authorities
    });

    setIsAuthenticated(true);
  };

  const logout = async() => {
   try {
    const logoutPayload={
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken')
    }
    await axiosInstance.post(`${environment.apiUrl}/auth/logout`, {logoutPayload})
   } catch (error) {
    console.error('Error encountered while logging out')
   }finally{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem("currentStep");
    localStorage.removeItem("propertyFormData");
    setUser(null);
    setTimeout(()=>{
      navigate("/", {replace:true})
    },500)
    setIsAuthenticated(false);
   }
  };

  const signup = async (email, password) => {
    try {
      const response = await axiosInstance.post(`${environment.apiUrl}/auth/signup`, { email, password });
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const decodedToken = jwtDecode(accessToken);

      setUser({
        id: decodedToken.userId,
        email: decodedToken.sub,
        publicId: decodedToken.publicId,
        authorities: decodedToken.authorities
      });

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const contextValue = {
    user,
    login,
    logout,
    signup,
    oauthLogin,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
