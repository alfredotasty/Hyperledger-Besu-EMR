import { useState } from 'react';
const Record = () => {
  // test data
  const user = ['Person1', 'Person2', 'Person3'];
  const [patient_name, setPatient_name] = useState('Panupong Noinin');
  const [patient_name_input, setPatient_name_input] = useState('');
  const [patient_blood, setPatient_blood] = useState('A')
  const [patient_blood_input, setPatient_blood_input] = useState('')
  const [patient_birthDate, setPatient_birthDate] = useState('03/06/1999')
  return (
    <div class=''>
      <br />
      <br />
      <br />
      <br />
      <h2>Medical Record Section</h2>
      <div class='row form'>
        <div class='column'>
          <h4>patient permission</h4>
          <label>patient publicKey</label>
          <br />
          <input className='input_default' type='text' />
          <br />
          <button className='button_createGroup'>Confirm</button> <br /> <br />{' '}
          <br />
          <h4>Patient History</h4>
          <input className='input_default' type='text' />
          <br />
          <button className='button_createGroup'>Show History</button>
          <label>choose private key</label>
          <input type='file'/>
        </div>

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
        <div className='column'>
          <h3>Patient Profile</h3>
          <h4>Name:-:{patient_name}</h4>
          <input className='input_default' type='text' />
          <button className='button_createGroup'>Read</button>
          <button className='button_createGroup'>Save</button>
          <h4>Blood group:-:{patient_blood}</h4>
          <input className='input_default' type='text' />
          <button className='button_createGroup'>Read</button>
          <button className='button_createGroup'>Save</button>
          <h4>Birth date:-:{patient_birthDate}</h4>
          <input className='input_default' type='text' />
          <button className='button_createGroup'>Read</button>
          <button className='button_createGroup'>Save</button>
        </div>
      </div>
    </div>
  );
};
export default Record;
