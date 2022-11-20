import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Authen = () => {
  const [usr, setUsr] = useState('');
  const [pwd, setPwd] = useState('');
  const [port, setPort] = useState('');
  const [status, setStatus] = useState('');
  const login = () => {
    const data = { username: usr, password: pwd };
    sessionStorage.clear();
    axios
      .post(`http://localhost:${port}/login`, data)
      .then((response) => {
        if (response.data.token.length !== 0) {
          // verifly_token(response.data.token);
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('user', usr);
          setStatus(`Login as ${sessionStorage.getItem('user')}`);
          Swal.fire({
            icon: 'success',
            title: 'Connect Success!!',
            text: response.data.message,
            confirmButtonColor: '#00FF00',
            confirmButtonText: 'OK',
          });
        }
      })
      .catch((err) => {
        if (err.name === 'AxiosError') {
          // console.log(err.response.status);

          Swal.fire({
            icon: 'error',
            title: 'Connect Fail',
            text: err.message,
            confirmButtonColor: '#FF0000',
            confirmButtonText: 'Close',
          });
        }
      });
  };

  // const verifly_token = (token) => {

  //   // console.log("param verifly = ",token);
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  //   };

  //   const bodyParameters = {
  //     "jsonrpc": "2.0",
  //     "method": "priv_createPrivacyGroup",
  //     "params":
  //       [
  //         {
  //           "addresses": [
  //             "pUlpb1ZHkNfJXQbVzGkaGeAtGE/qTsmKWeR6/ilZRC8=",
  //             "9sTR0aTy3x8tTVZPIAuJCAdLf0u0Fq1kYp2HucnNUmQ=",
  //             "16YSE4L7vFYlcErmE74IxSxp5NrG+tkN7VL7Nnrl0DM="
  //           ],
  //           "name": "Group A",
  //           "description": "Description Group A"
  //         }
  //       ],
  //     "id": 1
  //   };

  //   axios.post('http://localhost:8545', bodyParameters, config).then((response) => {
  //     setStatus(response.request.status);
  //     console.log(response.request.status);
  //     // console.log('Login Status = ',status);
  // Swal.fire({
  //   icon: 'success',
  //   title: "Connect Success!!",
  //   text: response.data.message,
  //   confirmButtonColor: "#00FF00",
  //   confirmButtonText: "OK",
  // })
  //     // return response;

  //   });

  // };
  return (
    <div className='authen'>
      <div className='center'>
        <h3 className='login_title center '>Authentication</h3>
      </div>
      {/* <h3>Authentication</h3> */}
      {/* <h4>{status}</h4> */}
      <div class='center form'>
        <label>PORT</label>
        <br />
        <input
          className='input_connect'
          type='text'
          onChange={(e) => {
            setPort(e.target.value);
          }}
        />
        <br />
        <label>Username</label>
        <br />
        <input
          className='input_connect'
          type='text'
          onChange={(e) => {
            setUsr(e.target.value);
          }}
          placeholder='Enter Username'
          name='uname'
          required
        />
        <br />
        <label>Password</label>
        <br />
        <input
          className='center'
          type='password'
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          placeholder='Enter Password'
          name='psw'
          required
        />
        <br />
        <button className=' button_connect center' onClick={login}>
          CONNECT
        </button>
      </div>
    </div>
  );
};
export default Authen;
