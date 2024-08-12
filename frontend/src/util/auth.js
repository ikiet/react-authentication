export const saveToken = (token) => {
  localStorage.setItem('token', token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);

  localStorage.setItem('expiration', expiration.toISOString());
}

export const getToken = () => {
  return localStorage.getItem('token');
}
