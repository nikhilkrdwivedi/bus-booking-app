// AuthContext.tsx
import { validateToken } from '@data/rest/authentication';
import  { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import { removeLocalStorage } from "@utils/manageLocalStorage";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserContext: (oject: any) => void;
  userContext: any;

};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }:any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userContext, setUserContext] = useState({});
  // const navigate = useNavigate();
  async function validateUserToken() {
  try {
    await validateToken();
    setUserContext(JSON.parse(localStorage.getItem("userCtx") as string));
    setIsAuthenticated(true);
  } catch (error) {
    removeLocalStorage(["userCtx", "token"]);
    setIsAuthenticated(false);
    // navigate("/");
  }
}
const resetIsAuthenticatedAndUserContext = () => {
  setIsAuthenticated(false);
  removeLocalStorage(["userCtx", "token"]);
};
const setIsAuthenticatedAndUserContext = ({ userCtx }:any) => {
  setIsAuthenticated(true);
};

  const login = (token: string) => {
    console.log(token)
    // Perform token validation logic
    // Update isAuthenticated state
  };

  const logout = () => {
    // Clear token and update isAuthenticated state
  };

  // Run token validation on page refresh or route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateUserToken();
    } else {
      resetIsAuthenticatedAndUserContext();
    }
    console.log("HI--")
  }, [isAuthenticated]);

  
  return (
    <AuthContext.Provider value={{
      login,
      logout,
      isAuthenticated,
      setIsAuthenticated,
      userContext, 
      setUserContext
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextType;
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
