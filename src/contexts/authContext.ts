import { createContext, Dispatch, SetStateAction } from 'react';
import { companyData } from '../types/authentication';

export interface AuthContextData {
    authData?: companyData | null;
    signIn: (user: string, password: string) => Promise<boolean>;
    signOut: () => Promise<void>;
    isLoading: boolean;
    changeLoader: (state: boolean) => void;
}

export const AuthContext = createContext({} as AuthContextData);