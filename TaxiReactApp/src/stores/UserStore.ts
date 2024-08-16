import { create } from 'zustand';
import LoginResponseData from '../models/LoginResponseData';

interface UserState {
    user: LoginResponseData | null;
    setUser: (user: LoginResponseData) => void;
    clearUser: () => void;
}

interface DriversState {
    drivers: LoginResponseData[];
    setDrivers: (drivers: LoginResponseData[]) => void;
    updateDriver: (updatedDriver: LoginResponseData) => void;
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

export const useDriverStore = create<DriversState>((set) => ({
    drivers: [],
    setDrivers: (drivers) => set({ drivers }),
    updateDriver: (updatedDriver) => set((state) => ({
        drivers: state.drivers.map(driver =>
            driver.id === updatedDriver.id ? updatedDriver : driver
        ),
    })),
}));