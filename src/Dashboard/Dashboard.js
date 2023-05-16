import React, { useState } from 'react';
import axios from 'axios';
import { getUsername, logout ,getUser, removeUserSession } from '../Utils/Common';
 
function Dashboard(props) {
  // const user = getUser();
 
  // handle click event of logout button
  const [loading, setLoading] = useState(false);
  const username = getUsername();
  const [error, setError] = useState(null);
  const headers = {
    headers: { Authorization: 'Bearer 4pb4tech' }
  };
  const ip = 'http://127.0.0.1:8000';
  const url = ip + '/api/user/logout';
  const handleLogout = () => {
    setError(null);
    setLoading(true);
    axios.post(url, { username: sessionStorage.getItem('username') }, headers).then(response => {
      logout();
      window.location.href = "/login";
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
    // removeUserSession();
    // props.history.push('/login');
  }
 
  return (
    <div>
      Welcome {username}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}
 
export default Dashboard;