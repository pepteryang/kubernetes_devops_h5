export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  return localStorage.setItem("token", token);
}

export function removeToken() {
  return localStorage.removeItem("token");
}

export function setAuthenticate(data) {
  return localStorage.setItem("isAuthenticated", data);
}

export function setRoles(data) {
    return localStorage.setItem("roles", data);
}
