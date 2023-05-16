import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

 
function LoginLama(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const headers = {
    headers: { Authorization: 'Bearer 4pb4tech' }
  };
  const ip = 'http://127.0.0.1:8000';
  const url = ip + '/api/user/login';
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post(url, { username: username.value, password: password.value }, headers).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      console.log("Pasang Session");
      console.log("Response");
      console.log(response);
      console.log("Response Data");
      console.log(response.data);
      console.log("Response Data Username");
      console.log(response.data.data[0]['username']);
      sessionStorage.setItem("pengguna", response.data.data);
      sessionStorage.setItem("username", response.data.data[0]['username']);
      sessionStorage.setItem("userID", response.data.data[0]['id']);
      sessionStorage.setItem("token", response.data.data[0]['token']);
      sessionStorage.setItem("token_expired", response.data.data[0]['token_expired']);
      sessionStorage.setItem("role_id", response.data.data[0]['role_id']);
      // props.history.push('/dashboard');
      window.location.href = "/dashboard";
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }
 
  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6'>
          
          <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='username' size="lg" {...username}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" {...password}/>
          
          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          {/* <MDBBtn className="mb-4 w-100" size="lg">Sign in</MDBBtn> */}
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />

          {/* <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div> */}

          {/* <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
            <MDBIcon fab icon="facebook-f" className="mx-2"/>
            Continue with facebook
          </MDBBtn>

          <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
            <MDBIcon fab icon="twitter" className="mx-2"/>
            Continue with twitter
          </MDBBtn> */}

        </MDBCol>

      </MDBRow>
    </MDBContainer>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default LoginLama;