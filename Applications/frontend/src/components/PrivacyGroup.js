import axios from 'axios';
import React, { useState } from 'react';

const PrivacyGroup = () => {
  const [createMembers, setCreateMember] = useState('');
  const [findMembers, setFindMember] = useState('');
  const [delGroup, setDelGroup] = useState('');
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [findResult, setFindResult] = useState([]);
  const [createResult, setCreateResult] = useState('');

  const createGroup = () => {
    const data = {
      token: sessionStorage.getItem('token'),
      members: createMembers,
      name: groupName,
      description: description,
      user: sessionStorage.getItem('user'),
    };
    axios.post('http://localhost:4000/create_group', data).then((response) => {
      try {
        setCreateResult(response.data.privacyGroupId);
      } catch (error) {
        console.log(error);
      }
    });
  };
  const findGroup = () => {
    const data = {
      user: sessionStorage.getItem('user'),
      members: findMembers,
      token: sessionStorage.getItem('token'),
    };
    axios.post('http://localhost:4000/find_group', data).then((response) => {
      try {
        setFindResult(response.data.resultList);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteGroup = () => {
    const data = {
      token: sessionStorage.getItem('token'),
      user: sessionStorage.getItem('user'),
      privacyGroupId: delGroup,
    };
    axios.post('http://localhost:4000/delete_group', data).then((response) => {
      alert(response.data.result);
    });
  };
  return (
    <div class='row'>
      <h2>Privacy-Group-Section</h2>

      <div class='column'>
        <h4>Create privacy group</h4>

        <label>Members</label>
        <br />
        <textarea
          className='member-input'
          placeholder='Username Sparate By Comma(,) Example: user1_1,hospitalA'
          onChange={(e) => {
            setCreateMember(e.target.value);
          }}
        ></textarea>
        <br />
        <label>Group Name</label>
        <br />
        <input
          type='text'
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <br />
        <label>Description</label>
        <br />
        <input
          type='text'
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <br />
        <button onClick={createGroup}>Create Group</button>
        <h3>{createResult}</h3>
      </div>
      <div class='column'>
        <h4>Find Privacy Group</h4>

        <label>Members</label>
        <br />
        <textarea
          className='member-input'
          placeholder='Username Sparate By Comma(,) Example: user1_1,hospitalA'
          onChange={(e) => {
            setFindMember(e.target.value);
          }}
        ></textarea>
        <br />
        <button onClick={findGroup}>Find</button>
        <br />
        <ul>
          {findResult.map((i) => (
            <li>{i}</li>
          ))}
        </ul>
      </div>
      <div class='column'>
        <h4>Delete Privacy Group</h4>

        <label>privacyGroupId</label>
        <br />
        <textarea
          className='member-input'
          placeholder='Privacy Group Id'
          onChange={(e) => {
            setDelGroup(e.target.value);
          }}
        ></textarea>
        <br />
        <button onClick={deleteGroup}>delete</button>
        <br />
      </div>
    </div>
  );
};
export default PrivacyGroup;
