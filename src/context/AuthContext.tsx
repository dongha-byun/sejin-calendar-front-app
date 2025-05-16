import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const ACCESS_TOKEN_KEY = "access-token";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(ACCESS_TOKEN_KEY) === "true";
  });

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem(ACCESS_TOKEN_KEY, "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
