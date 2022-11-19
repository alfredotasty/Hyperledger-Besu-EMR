import React from 'react';
import axios from 'axios';
const PatientSide = () => {
  return (
    <div>
      <h3>Patient Side</h3>
      <label>verify key</label>
      <br />
      <input type='text' onChange={(e) => {}} />
      <h4>Add AllowList</h4>
      <br />
      <label>Key to add</label>
      <br />
      <input type='text' onChange={(e) => {}} />
      <button>Add</button>
      <br />
      <h4>Remove AllowList</h4>
      <label>Key to remove</label>
      <br />
      <input type='text' onChange={(e) => {}} />
      <button>remove</button>
      <h4>Get AllowList</h4>
      <label>Key to add</label>
      <br />
      <input type='text' onChange={(e) => {}} />
      <button>get</button>
      <p>result:</p>
      <h4>setName</h4>
      <label>Name</label>
      <br />
      <input type='text' />
      <h4>getName</h4>
      <button>get</button>
      <p>result:</p>
      <h4>setBlood Group</h4>
      <label>blood group</label>
      <br />
      <input type='text' />
      <h4>get blood group</h4>
      <button>get</button>
      <p>result:</p>
      <h4>set birth date</h4>
      <label>birth date</label>
      <br />
      <input type='text' />
      <h4>get birth date</h4>
      <button>get</button>
      <p>result:</p>
      <h4>add records</h4>
      <label>record</label>
      <br />
      <input type='text' />
      <h4>get records</h4>
      <button>get</button>
      <p>result:</p>

    </div>
  );
};
export default PatientSide;
