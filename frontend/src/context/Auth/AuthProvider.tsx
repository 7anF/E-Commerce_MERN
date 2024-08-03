import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./Auth";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );

  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        login,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
