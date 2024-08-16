import { create } from 'zustand';
import LoginResponseData from '../models/LoginResponseData';

interface UserState {
    user: LoginResponseData | null;
    setUser: (user: LoginResponseData) => void;
    clearUser: () => void;
}

export const UserStore = create<UserState>((set) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
    },
    clearUser: () => {
        localStorage.removeItem('user');
        set({ user: null });
    },
}));
