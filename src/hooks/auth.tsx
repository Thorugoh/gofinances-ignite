import React, { createContext, ReactNode, useContext } from 'react';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
}

export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

    const user = {
        id: '@victor',
        name: 'Victor Hugo',
        email: 'hugovictoor77@gmail.com'
    }

    return (
        <AuthContext.Provider value={{ user }}>
            { children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }
