import React, { useState } from 'react';
import axios from 'axios';

const Authen = () => {
  const [usr, setUsr] = useState('');
  const [pwd, setPwd] = useState('');
  const [port, setPort] = useState('');
  const [status, setStatus] = useState('');
  const login = () => {
    const data = { username: usr, password: pwd };
    sessionStorage.clear();
    axios.post(`http://localhost:${port}/login`, data).then((response) => {
      try {
        if (response.data.token) {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('user', usr);
          setStatus(`Login as ${sessionStorage.getItem('user')}`)
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <div className='authen'>
      <h3>Authentication</h3>
      <h4>{status}</h4>
      <label>PORT</label>
      <br />
      <input
        type='text'
        onChange={(e) => {
          setPort(e.target.value);
        }}
      />
      <br />
      <label>Username</label>
      <br />
      <input
        type='text'
        onChange={(e) => {
          setUsr(e.target.value);
        }}
      />
      <br />
      <label>Password</label>
      <br />
      <input
        type='text'
        onChange={(e) => {
          setPwd(e.target.value);
        }}
      />
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
};
export default Authen;
