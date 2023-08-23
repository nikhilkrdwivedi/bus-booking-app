/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateToken } from "@data/rest/authentication";
import { createContext, useContext, useState, useEffect } from "react";
import { removeLocalStorage, setLocalStorage } from "@utils/manageLocalStorage";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserContext: (args: any) => void;
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
