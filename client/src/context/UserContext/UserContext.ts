import React from 'react';
import { createContext } from 'react';
import { User } from '@/@types';

export interface UserContextInterface {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>> | null;
}

const initValues = {
    user: null,
    setUser: null,
};

export const UserContext = createContext<UserContextInterface>(initValues);
