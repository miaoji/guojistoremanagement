// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('mzck-pro-authority') || 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem('mzck-pro-authority', authority);
}

export function getToken() {
  return localStorage.getItem('mzck-pro-token') || 'admin';
}

export function setToken(token) {
  return localStorage.setItem('mzck-pro-token', token);
}
