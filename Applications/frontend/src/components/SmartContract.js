import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const SmartContract = () => {
  const [groupId, setGroupId] = useState('');
  const [result, setResult] = useState('');
  const [allowLists, setAllowList] = useState([]);
  const [verifyKey, setVerifyKey] = useState('');
  const [addKey, setAddKey] = useState('');
  const [removeKey, setRemoveKey] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [privacyGroupId, setPrivacyGroupId] = useState('');
  
  const deploy = () => {
    const data = {
      token: sessionStorage.getItem('token'),
      user: sessionStorage.getItem('user'),
      privacyGroupId: groupId,
    };
    axios
      .post('http://localhost:4000/deploy', data)
      .then((response) => {
        setResult(response.data.result);
        Swal.fire({
          icon: 'success',
          title: 'Admit Success!! \n Admit ID',
          text: response.data.result,
          confirmButtonColor: '#00FF00',
          confirmButtonText: 'OK',
        });
      })
      .catch((err) => {
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

  const showAllowLIst = () => {
    const data = {
      user: sessionStorage.getItem('user'),
      contractAddress: contractAddress,
      privacyGroupId: privacyGroupId,
      value: verifyKey,
      token: sessionStorage.getItem('token'),
    };
    console.log(data);
    axios.post('http://localhost:4000/getAllowList', data).then((response) => {
      setAllowList(response.data.result);
      Swal.fire({
        icon: 'success',
        title: 'Success!! ',
        text: response.data.result,
        confirmButtonColor: '#00FF00',
        confirmButtonText: 'OK',
      });

    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Show Error',
        text: err.message,
        confirmButtonColor: '#FF0000',
        confirmButtonText: 'Close',
      });
    })
  };

  const addAllowList = () => {
    const data = {
      user: sessionStorage.getItem('user'),
      contractAddress: contractAddress,
      privacyGroupId: privacyGroupId,
      value: [addKey,verifyKey],
      token: sessionStorage.getItem('token'),
    };
    axios.post('http://localhost:4000/addAllowList', data).then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Success!! ',
        text: response.data.result,
        confirmButtonColor: '#00FF00',
        confirmButtonText: 'OK',
      });
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Add allowlist Error',
        text: err.message,
        confirmButtonColor: '#FF0000',
        confirmButtonText: 'Close',
      });
    })
  };
  const removeAllowList = () => {
    const data = {
      user: sessionStorage.getItem('user'),
      contractAddress: contractAddress,
      privacyGroupId: privacyGroupId,
      value: [removeKey,verifyKey],
      token: sessionStorage.getItem('token'),
    };
    axios.post('http://localhost:4000/removeAllowList', data).then((response) => {
      alert('deleted')
      Swal.fire({
        icon: 'success',
        title: 'Delete Success!! ',
        text: response.data.result,
        confirmButtonColor: '#00FF00',
        confirmButtonText: 'OK',
      });
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Delete Error',
        text: err.message,
        confirmButtonColor: '#FF0000',
        confirmButtonText: 'Close',
      });
    })
  }
  return (
    <div className=''>
      <br />
      <h2>Admid Request</h2>
      <div className='row form'>
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
          <button className='button_admit' onClick={deploy}>
            Admit(Deploy)
          </button>
        </div>
        <div className='column'>
          <h3>Manage Allowlist</h3>
          <label>Contract Address</label>
          <input
            type='text'
            className='smart-contract-input input_admit'
            onChange={(e) => {
              setContractAddress(e.target.value);
            }}
          />
          <label>Privacy Group ID</label>
          <input
            type='text'
            className='smart-contract-input input_admit'
            onChange={(e) => {
              setPrivacyGroupId(e.target.value);
            }}
          />
          <label>Verify Key</label>
          <input
            type='text'
            className='smart-contract-input input_admit'
            onChange={(e) => {
              setVerifyKey(e.target.value);
            }}
          />
          <button className='button_admit' onClick={showAllowLIst}>
            Show allow list
          </button>
          <ul>
            {allowLists.map((i) => (
              <li>{i}</li>
            ))}
          </ul>
          <input
            type='text'
            className='smart-contract-input input_admit'
            onChange={(e) => {
              setAddKey(e.target.value);
            }}
          />
          <button className='button_admit' onClick={addAllowList}>Add to allow list</button>
          <input
            type='text'
            className='smart-contract-input input_admit'
            onChange={(e) => {
              setRemoveKey(e.target.value);
            }}
          />
          <button className='button_admit' onClick={removeAllowList}>Remove from allow list</button>
        </div>
      </div>

      <p className='form'>result:{result}</p>
      <hr></hr>
    </div>
  );
};
export default SmartContract;
