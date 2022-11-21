import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Record = () => {
  // test data
  const user = ['Person1', 'Person2', 'Person3'];
  const [patient_name, setPatient_name] = useState('Panupong Noinin');
  const [patient_name_input, setPatient_name_input] = useState('');
  const [patient_blood, setPatient_blood] = useState('A')
  const [patient_blood_input, setPatient_blood_input] = useState('')
  const [patient_birthDate, setPatient_birthDate] = useState('03/06/1999')
  const [groupId, setGroupId] = useState('');
  const [privacyGroupId, setPrivacyGroupId] = useState('');
  const [result, setResult] = useState('');
  const [name, setName] = useState('');
  const [verifyKey, setVerifyKey] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [blood, setBlood] = useState('')
  const [date, setDate] = useState('')
  const[nameResult, setNameResult] = useState('')
  const[bloodResult, setBloodResult] = useState('')
  const[dateResult, setDateResult] = useState('')


  const saveName = () => {
    const data = {
        user: sessionStorage.getItem('user'),
        contractAddress: contractAddress,
        privacyGroupId: privacyGroupId,
        value: [name,verifyKey],
        token: sessionStorage.getItem('token'),
      };
      axios
      .post('http://localhost:4000/setName', data)
      .then((response) => {
        setResult(response.data.result);
        Swal.fire({
          icon: 'success',
          title: 'Admit Success!! \n Admit ID',
          text: response.data.result,
          confirmButtonColor: '#00FF00',
          confirmButtonText: 'OK',
        });
      }) .catch((err) => {
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
  }
  const saveBlood = () => {
    const data = {
        user: sessionStorage.getItem('user'),
        contractAddress: contractAddress,
        privacyGroupId: privacyGroupId,
        value: [blood,verifyKey],
        token: sessionStorage.getItem('token'),
      };
      axios
      .post('http://localhost:4000/setBlood', data)
      .then((response) => {
        setResult(response.data.result);
        Swal.fire({
          icon: 'success',
          title: 'Admit Success!! \n Admit ID',
          text: response.data.result,
          confirmButtonColor: '#00FF00',
          confirmButtonText: 'OK',
        });
      }) .catch((err) => {
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
  }
  const saveDate = () => {
    const data = {
        user: sessionStorage.getItem('user'),
        contractAddress: contractAddress,
        privacyGroupId: privacyGroupId,
        value: [date,verifyKey],
        token: sessionStorage.getItem('token'),
      };
      axios
      .post('http://localhost:4000/setBirthDate', data)
      .then((response) => {
        setResult(response.data.result);
        Swal.fire({
          icon: 'success',
          title: 'Admit Success!! \n Admit ID',
          text: response.data.result,
          confirmButtonColor: '#00FF00',
          confirmButtonText: 'OK',
        });
      }) .catch((err) => {
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
  }
  const readName = () => {
    const data = {
        user: sessionStorage.getItem('user'),
        contractAddress: contractAddress,
        privacyGroupId: privacyGroupId,
        value: verifyKey,
        token: sessionStorage.getItem('token'),
      };
      axios
      .post('http://localhost:4000/getName', data)
      .then((response) => {
        setNameResult(response.data.result);
        Swal.fire({
          icon: 'success',
          title: 'Read Success!!',
          text: response.data.result,
          confirmButtonColor: '#00FF00',
          confirmButtonText: 'OK',
        });
      }) .catch((err) => {
        if (err.name === 'AxiosError') {
          // console.log(err.response.status);
          Swal.fire({
            icon: 'error',
            title: 'Read Fail',
            text: err.message,
            confirmButtonColor: '#FF0000',
            confirmButtonText: 'Close',
          });
        }
      });
  }
  const readBlood = () => {
    const data = {
        user: sessionStorage.getItem('user'),
        contractAddress: contractAddress,
        privacyGroupId: privacyGroupId,
        value: verifyKey,
        token: sessionStorage.getItem('token'),
      };
      axios
      .post('http://localhost:4000/getBlood', data)
      .then((response) => {
        setBloodResult(response.data.result);
        Swal.fire({
          icon: 'success',
          title: 'Read Success!!',
          text: response.data.result,
          confirmButtonColor: '#00FF00',
          confirmButtonText: 'OK',
        });
      }) .catch((err) => {
        if (err.name === 'AxiosError') {
          // console.log(err.response.status);
          Swal.fire({
            icon: 'error',
            title: 'Read Fail',
            text: err.message,
            confirmButtonColor: '#FF0000',
            confirmButtonText: 'Close',
          });
        }
      });
  }
  const readDate = () => {
    const data = {
        user: sessionStorage.getItem('user'),
        contractAddress: contractAddress,
        privacyGroupId: privacyGroupId,
        value: verifyKey,
        token: sessionStorage.getItem('token'),
      };
      axios
      .post('http://localhost:4000/getBirthDate', data)
      .then((response) => {
        setDateResult(response.data.result);
        Swal.fire({
          icon: 'success',
          title: 'Read Success!!',
          text: response.data.result,
          confirmButtonColor: '#00FF00',
          confirmButtonText: 'OK',
        });
      }) .catch((err) => {
        if (err.name === 'AxiosError') {
          // console.log(err.response.status);
          Swal.fire({
            icon: 'error',
            title: 'Read Fail',
            text: err.message,
            confirmButtonColor: '#FF0000',
            confirmButtonText: 'Close',
          });
        }
      });
  }

    const handleContractInput = () => {
        console.log(contractAddress)
        if (contractAddress != ''){
            Swal.fire({
                icon: 'success',
                title: 'Recive Contract Address',
                text: contractAddress,
                confirmButtonColor: '#00FF00',
                confirmButtonText: 'OK',
        });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Emty Value!',
                text: 'please input contract address',
                confirmButtonColor: '#FF0000',
                confirmButtonText: 'Close',
              });
        }
    }

    const handlePrivacyInput = () => {
        console.log(privacyGroupId)
        if (privacyGroupId != ''){
            Swal.fire({
                icon: 'success',
                title: 'Recive Privacy GroupId',
                text: privacyGroupId,
                confirmButtonColor: '#00FF00',
                confirmButtonText: 'OK',
        });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Emty Value!',
                text: 'please input Privacy GroupId',
                confirmButtonColor: '#FF0000',
                confirmButtonText: 'Close',
              });
        }
    }
    const handleKeyInput = () => {
        console.log(verifyKey)
        if (verifyKey != ''){
            Swal.fire({
                icon: 'success',
                title: 'Recive Verify Key',
                text: verifyKey,
                confirmButtonColor: '#00FF00',
                confirmButtonText: 'OK',
        });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Emty Value!',
                text: 'please input Verify Key',
                confirmButtonColor: '#FF0000',
                confirmButtonText: 'Close',
              });
        }

  }
  return (
    <div class=''>
      <br />
      <br />
      <br />
      <br />
      <h2>Medical Record Section</h2>
      <div class='row form'>
      <div class='column'>
          <div>
            <h4>Name</h4>
            <input className='input_default' type='text' />
            <br />
          </div>
          <br />
          <div>
            <h4>Record</h4>
            <input className='input_default' type='text' />
            <br />
          </div>
          <br />
          <div>
            <h4>Date</h4>
            <input className='input_default' type='text' />
            <br />
          </div>
          <button className='button_createGroup'>Confirm</button>
        </div>
        <div class='column'>
          <h4>Contract address</h4>
          <label>Patient contract address</label>
          <br />
          <input className='input_default' type='text' onChange={(e) => {
            setContractAddress(e.target.value);
          }} />
          <br />
          <button className='button_createGroup' onClick={handleContractInput}>Confirm</button> <br /> <br />{' '}
          <br />
          <h4>Privacy Group</h4>
          <input className='input_default' type='text' onChange={(e) => {
            setPrivacyGroupId(e.target.value);
          }} />
          <br />
          <button className='button_createGroup'onClick={handlePrivacyInput}>Confirm</button>
          <br /> <br /><br/>
          <h4>Verify Key</h4>
          <input className='input_default' type='text' onChange={(e) => {
            setVerifyKey(e.target.value);
          }} />
          <button className='button_createGroup'onClick={handleKeyInput}>Confirm</button>
          
        </div>
        

        <div className='column'>
          <h3>Patient Profile</h3>
          <h4>Name:-:{nameResult}</h4>
          <input className='input_default' type='text'
            onChange={(e) => {
            setName(e.target.value);
          }} />
          <button className='button_createGroup'>Read</button>
          <button className='button_createGroup' onClick={saveName} >Save</button>
          <h4>Blood group:-:{bloodResult}</h4>
          <input className='input_default' type='text'
           onChange={(e) => {
            setBlood(e.target.value);
          }}  />
          <button className='button_createGroup'>Read</button>
          <button className='button_createGroup' onClick={saveBlood}>Save</button>
          <h4>Birth date:-:{dateResult}</h4>
          <input className='input_default' type='text' 
          onChange={(e) => {
            setDate(e.target.value);
          }} />
          <button className='button_createGroup'>Read</button>
          <button className='button_createGroup' onClick={saveDate}>Save</button>
        </div>
      </div>
    </div>
  );
};
export default Record;
