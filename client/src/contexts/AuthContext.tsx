// AuthContext.tsx
import { validateToken } from "@data/rest/authentication";
import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { removeLocalStorage, setLocalStorage } from "@utils/manageLocalStorage";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserContext: (oject: any) => void;
  userContext: any;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userContext, setUserContext] = useState({});
  async function validateUserToken() {
    try {
      const {
        data: { data },
      } = await validateToken();
      console.log({ data });
      setUserContext(data);
      await setLocalStorage({
        userCtx: JSON.stringify(data),
      });
      setIsAuthenticated(true);
    } catch (error) {
      removeLocalStorage(["userCtx", "token"]);
      setIsAuthenticated(false);
    }
  }
  const resetIsAuthenticatedAndUserContext = () => {
    setIsAuthenticated(false);
    removeLocalStorage(["userCtx", "token"]);
    setUserContext({});
  };

  const login = (token: string) => {
    // console.log(token);
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
    // console.log("HI--");
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        setIsAuthenticated,
        userContext,
        setUserContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextType;
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
