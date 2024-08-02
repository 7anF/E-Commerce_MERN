import { createContext, useContext } from "react";

interface IAuthContextType {
    username: string | null;
    token: string | null;
    login: (username: string, token: string) => void;
    isAuthenticated: boolean;
};

export const AuthContext = createContext<IAuthContextType>({
    username: null,
    token: null,
    login: () => {},
    isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);