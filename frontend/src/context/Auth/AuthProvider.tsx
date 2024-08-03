import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./Auth";
import { BASE_URL } from "../../constant/Baseurl";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );

  const [myOrders, setMyOreders] = useState([]);

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

  const getMyOrders = async () => {
    const response = await fetch(`${BASE_URL}/user/my-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return;

    const data = await response.json();

    setMyOreders(data);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        login,
        isAuthenticated,
        logout,
        getMyOrders,
        myOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
