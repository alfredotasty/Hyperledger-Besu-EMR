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
    <div>
      <h3>Smart Contract</h3>
      <h4>Deploy Smart Contract</h4>
      <label>Privacy Group ID</label>
      <br />
      <input
        type='text'
        className='smart-contract-input'
        onChange={(e) => {
          setGroupId(e.target.value);
        }}
      />
      <button onClick={deploy}>Deploy</button>
      <p>result:{result}</p>
    </div>
  );
};
export default SmartContract;
