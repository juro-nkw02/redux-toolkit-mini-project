import { LTOKEN } from "../constants";

export const setLocalStorageService = (token) => {
  localStorage.setItem(LTOKEN, JSON.stringify(token));
}
export const getLocalStorageService = () => {
  return JSON.parse(localStorage.getItem(LTOKEN));
}
export const removeLocalStorageService = () => {
  localStorage.removeItem(LTOKEN);
}
