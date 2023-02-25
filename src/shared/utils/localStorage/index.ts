export const isBrowser = () => typeof window !== 'undefined';

export const saveToLocalStorage = (key: string, value?: string): void => {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, value || '');
};

export const getFromLocalStorage = (key: string): string =>
  (isBrowser() && window.localStorage.getItem(key)) || '';

export const removeFromLocalStorage = (key: string): void => {
  if (!isBrowser) return;
  window.localStorage.removeItem(key);
};

export const getKeyValueFromLocalStorage = (): string[] => Object.keys(window.localStorage);
