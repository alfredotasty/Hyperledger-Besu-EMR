import React, { useState } from 'react';
import axios from 'axios';
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
      try {
        setResult(response.data.result);
      } catch (error) {
        console.log(error);
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
