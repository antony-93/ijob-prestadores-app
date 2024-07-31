import { createContext, FC, ReactNode, useContext, useState } from "react";
import AuthService from "../../modules/Access/services/AuthService";
import { IPrestador } from "../../modules/Prestador/Models/IPrestador";
import * as SecureStore from 'expo-secure-store';

export interface AuthData {
    token: string;
    prestador: IPrestador;
}

interface AuthContextData {
    authData?: AuthData;
    autenticar: (authDto: { email: string, senha: string }) => Promise<AuthData>;
    signOut: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const [authData, setAuthData] = useState<AuthData>();
    
    async function autenticar(authDto: { email: string, senha: string }): Promise<AuthData> {
        const auth = await AuthService.autenticar(authDto);

        await SecureStore.setItemAsync('prestador_data', JSON.stringify(auth.prestador));
        await SecureStore.setItemAsync('access_token', auth.token);
        setAuthData(auth);

        return auth;
    }

    async function signOut(): Promise<void> {
        setAuthData(undefined);
        return;
    }

    return (
        <AuthContext.Provider value={{authData, autenticar, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() { 
    const context = useContext(AuthContext);
    return context;
}