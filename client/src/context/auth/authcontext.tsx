import { createContext, useContext, useEffect, useState } from "react";

interface UserData {
  name: string;
  id: string;
  [k: string]: string; // Allow additional properties
  // Add other user properties as needed
}

type AuthContextType = {
  user: UserData | null;
  login: (username: UserData) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData>({} as UserData);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  

  const login = (userData: UserData) => {
    const user = JSON.stringify(userData);
    setUser(userData as UserData);
    localStorage.setItem("user", user);
  };

  const logout = () => {
    setUser({} as UserData);
    localStorage.removeItem("user");
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
