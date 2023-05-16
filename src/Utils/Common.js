// Session Sendiri
export const getUsername = () => {
  return sessionStorage.getItem('username') || null;
}

export const logout = () => {
  sessionStorage.removeItem('pengguna');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('userID');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('token_expired');
  sessionStorage.removeItem('role_id');
}

// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('pengguna');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
   
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
   
  // set the token and user from the session storage
  export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
  }