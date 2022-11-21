import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const SmartContract = () => {
  const [groupId, setGroupId] = useState('');
  const [result, setResult] = useState('');
  const deploy = () => {
    const data = {
      token: sessionStorage.getItem('token'),
      user: sessionStorage.getItem('user'),
      privacyGroupId: groupId,
    };
    axios.post('http://localhost:4000/deploy', data).then((response) => {
        setResult(response.data.result);
        Swal.fire({
          icon: 'success',
          title: 'Admit Success!! \n Admit ID',
          text: response.data.result,
          confirmButtonColor: '#00FF00',
          confirmButtonText: 'OK',
        });
      }).catch((err) => {
        if (err.name === 'AxiosError') {
          // console.log(err.response.status);

          Swal.fire({
            icon: 'error',
            title: 'Admit Fail',
            text: err.message,
            confirmButtonColor: '#FF0000',
            confirmButtonText: 'Close',
          });
        }
      });
  };
  return (
    <div className=''>
  
      <br />
      <h2>Admid Request</h2>
      <div className='row form' >
        <label>Privacy Group ID</label>
        <br />
        <div className='column'>
          <input
            type='text'
            className='smart-contract-input input_admit'
            onChange={(e) => {
              setGroupId(e.target.value);
            }}
          />
        </div>
        <div className='column'>
          <button className='button_admit' onClick={deploy}>Admit(Deploy)</button>
        </div>


      </div>

      <p className='form'>result:{result}</p>
      <hr></hr>
    </div>
  );
};
export default SmartContract;
