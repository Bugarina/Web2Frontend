export const addToLocalStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
};

export const removeFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
};

export const clearLocalStorage = (): void => {
    localStorage.clear();
};

export const getItemFromLocalStorage = (key: string): string | null => {
    return localStorage.getItem(key);
};
