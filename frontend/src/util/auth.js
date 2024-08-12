import { redirect } from "react-router-dom";

export const saveToken = (token) => {
  localStorage.setItem('token', token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);

  localStorage.setItem('expiration', expiration.toISOString());
}

export const getToken = () => {
  return localStorage.getItem('token');
}

export const getTokenDuration = () => {
  const storedExpiration = localStorage.getItem('expiration');

  const expiration = new Date(storedExpiration);
  const now = new Date();
  return expiration.getTime() - now.getTime();
}

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
}

export const checkAuthLoader = () => {
  const token = getToken();
  if (!token) {
    return redirect('/auth');
  }
  return null;
}
