const express = require('express');
const fs = require('fs');
const cors = require('cors');
const Web3 = require('web3');
const Web3Quorum = require('web3js-quorum');
const { createHttpProvider } = require('web3js-quorum/example/helpers');
const { users } = require('./Users');
const mysql = require('mysql2');
const config = {
  host: 'localhost',
  port: 3306,
  database: 'EMR-BESU',
  user: 'root',
  password: 'thenax0306',
};
const db = mysql.createConnection(config);

const PORT = 4000;
const abi = JSON.parse(
  fs.readFileSync('../Smart-Contracts/Profile.abi', 'utf-8')
);
const binary = fs.readFileSync('../Smart-Contracts/Profile.bin', 'binary');
const app = express();
app.use(cors());
app.use(express.json());

const decodeParamArrayString = (_param) => {
  const web3 = new Web3('http://localhost:8545');
  const result = web3.eth.abi.decodeParameter('string[]', _param);
  return result;
};

const decodeParamString = (_param) => {
  const web3 = new Web3('http://localhost:8545');
  const result = web3.eth.abi.decodeParameter('string', _param);
  return result;
};

app.post('/create_group', (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  var members = req.body.members.split(',');
  const addresses = [];
  for (member of members) {
    addresses.push(users[member].tesseraPublicKey);
  }
  const txOptions = {
    addresses: addresses,
    name: req.body.name,
    description: req.body.description,
  };
  console.log(txOptions);
  web3.priv.createPrivacyGroup(txOptions).then((result) => {
    console.log(result);
    const queryString = `INSERT INTO PrivacyGroupId (username,privacyGroupId,members) VALUES ('${req.body.user}','${result}','${req.body.members}');`;
    db.query(queryString, (err, result) => {
      console.log(result);
    });
    res.json({ privacyGroupId: result });
  });
});

app.post('/find_group', async (req, res) => {
  const resultList = [];
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );

  var members = req.body.members.split(',');
  const addresses = [];
  for (member of members) {
    addresses.push(users[member].tesseraPublicKey);
  }
  await web3.priv.findPrivacyGroup(addresses).then((result) => {
    for (i of result) {
      resultList.push(i.privacyGroupId);
    }
    console.log(resultList);
  });
  res.json({ resultList });
});

app.post('/delete_group', (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  web3.priv.deletePrivacyGroup(req.body.privacyGroupId).then((response) => {
    const queryString = `DELETE FROM PrivacyGroupId WHERE privacyGroupId='${response}';`;
    db.query(queryString, (err, result) => {
      console.log(result);
    });
    res.json({result:response + '<<deleted>>'});
  });
});

app.post('/deploy', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );

  const txOptions = {
    data: `0x${binary}`,
    privateKey: users[req.body.user].privateKey,
    privacyGroupId: req.body.privacyGroupId,
    privateFrom: users[req.body.user].tesseraPublicKey,
  };
  console.log('Creating contract...');
  const txHash = await web3.priv.generateAndSendRawTransaction(txOptions);
  console.log('Getting contractAddress from txHash: ', txHash);
  const privateTxReceipt = await web3.priv.waitForTransactionReceipt(txHash);
  console.log('Private Transaction Receipt: ', privateTxReceipt);
  const queryString = `INSERT INTO TxAddress (username, contractAddress, privacyGroupId) VALUES ('${req.body.user}','${privateTxReceipt.contractAddress}', '${req.body.privacyGroupId}');`;
  db.query(queryString, (err, result) => {
    console.log(result);
  });
  res.json({ result: privateTxReceipt.contractAddress });
});

app.post('/setOwner', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  // eslint-disable-next-line no-underscore-dangle
  const contract = new web3.eth.Contract(abi);
  const value = req.body.value;
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === 'setOwner';
  });
  const functionArgs =
    value !== null
      ? web3.eth.abi.encodeParameters(functionAbi.inputs, [value]).slice(2)
      : null;
  const functionParams = {
    to: req.body.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: users[req.body.user].privateKey,
    privateFrom: users[req.body.user].tesseraPublicKey,
    privacyGroupId: req.body.privacyGroupId,
  };
  const transactionHash = await web3.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3.priv.waitForTransactionReceipt(transactionHash);
  console.log(' value from deployed contract is: ' + result.output);
  // const decode = decodeParam(result.output);
  res.json({ result: result.output });
});

app.post('/setName', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  // eslint-disable-next-line no-underscore-dangle
  const contract = new web3.eth.Contract(abi);
  const value = req.body.value;
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === 'setName';
  });
  const functionArgs =
    value !== null
      ? web3.eth.abi.encodeParameters(functionAbi.inputs, value).slice(2)
      : null;
  console.log(functionArgs);
  const functionParams = {
    to: req.body.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: users[req.body.user].privateKey,
    privateFrom: users[req.body.user].tesseraPublicKey,
    privacyGroupId: req.body.privacyGroupId,
  };
  const transactionHash = await web3.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3.priv.waitForTransactionReceipt(transactionHash);
  console.log(' value from deployed contract is: ' + result.output);
  // const decode = decodeParam(result.output);
  res.json({ result: result.output });
});

app.post('/getName', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  // eslint-disable-next-line no-underscore-dangle
  const contract = new web3.eth.Contract(abi);
  const value = req.body.value;
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === 'getName';
  });
  const functionArgs =
    value !== null
      ? web3.eth.abi.encodeParameters(functionAbi.inputs, [value]).slice(2)
      : null;
  console.log(functionArgs);
  const functionParams = {
    to: req.body.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: users[req.body.user].privateKey,
    privateFrom: users[req.body.user].tesseraPublicKey,
    privacyGroupId: req.body.privacyGroupId,
  };
  const transactionHash = await web3.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3.priv.waitForTransactionReceipt(transactionHash);
  console.log(' value from deployed contract is: ' + result.output);
  const decode = decodeParamString(result.output);
  res.json({ result: decode });
});

app.post('/setBirthDate', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  // eslint-disable-next-line no-underscore-dangle
  const contract = new web3.eth.Contract(abi);
  const value = req.body.value;
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === 'setBirthDate';
  });
  const functionArgs =
    value !== null
      ? web3.eth.abi.encodeParameters(functionAbi.inputs, value).slice(2)
      : null;
  console.log(functionArgs);
  const functionParams = {
    to: req.body.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: users[req.body.user].privateKey,
    privateFrom: users[req.body.user].tesseraPublicKey,
    privacyGroupId: req.body.privacyGroupId,
  };
  const transactionHash = await web3.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3.priv.waitForTransactionReceipt(transactionHash);
  console.log(' value from deployed contract is: ' + result.output);
  // const decode = decodeParamString(result.output);
  res.json({ result: result.output });
});

app.post('/getBirthDate', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  // eslint-disable-next-line no-underscore-dangle
  const contract = new web3.eth.Contract(abi);
  const value = req.body.value;
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === 'getBirthDate';
  });
  const functionArgs =
    value !== null
      ? web3.eth.abi.encodeParameters(functionAbi.inputs, [value]).slice(2)
      : null;
  console.log(functionArgs);
  const functionParams = {
    to: req.body.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: users[req.body.user].privateKey,
    privateFrom: users[req.body.user].tesseraPublicKey,
    privacyGroupId: req.body.privacyGroupId,
  };
  const transactionHash = await web3.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3.priv.waitForTransactionReceipt(transactionHash);
  console.log(' value from deployed contract is: ' + result.output);
  const decode = decodeParamString(result.output);
  res.json({ result: decode });
});

app.post('/setBlood', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  // eslint-disable-next-line no-underscore-dangle
  const contract = new web3.eth.Contract(abi);
  const value = req.body.value;
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === 'setBlood';
  });
  const functionArgs =
    value !== null
      ? web3.eth.abi.encodeParameters(functionAbi.inputs, value).slice(2)
      : null;
  console.log(functionArgs);
  const functionParams = {
    to: req.body.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: users[req.body.user].privateKey,
    privateFrom: users[req.body.user].tesseraPublicKey,
    privacyGroupId: req.body.privacyGroupId,
  };
  const transactionHash = await web3.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3.priv.waitForTransactionReceipt(transactionHash);
  console.log(' value from deployed contract is: ' + result.output);
  // const decode = decodeParam(result.output);
  res.json({ result: result.output });
});

app.post('/getBlood', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  // eslint-disable-next-line no-underscore-dangle
  const contract = new web3.eth.Contract(abi);
  const value = req.body.value;
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === 'getBlood';
  });
  const functionArgs =
    value !== null
      ? web3.eth.abi.encodeParameters(functionAbi.inputs, [value]).slice(2)
      : null;
  console.log(functionArgs);
  const functionParams = {
    to: req.body.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: users[req.body.user].privateKey,
    privateFrom: users[req.body.user].tesseraPublicKey,
    privacyGroupId: req.body.privacyGroupId,
  };
  const transactionHash = await web3.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3.priv.waitForTransactionReceipt(transactionHash);
  console.log(' value from deployed contract is: ' + result.output);
  const decode = decodeParamString(result.output);
  res.json({ result: decode });
});

app.post('/getAllowList', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  // eslint-disable-next-line no-underscore-dangle
  const contract = new web3.eth.Contract(abi);
  const value = req.body.value;
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === 'getAllowList';
  });
  const functionArgs =
    value !== null
      ? web3.eth.abi.encodeParameters(functionAbi.inputs, [value]).slice(2)
      : null;
  console.log(functionArgs);
  const functionParams = {
    to: req.body.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: users[req.body.user].privateKey,
    privateFrom: users[req.body.user].tesseraPublicKey,
    privacyGroupId: req.body.privacyGroupId,
  };
  const transactionHash = await web3.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3.priv.waitForTransactionReceipt(transactionHash);
  console.log(' value from deployed contract is: ' + result.output);
  const decode = decodeParamArrayString(result.output);
  res.json({ result: decode });
});

app.post('/addAllowList', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  // eslint-disable-next-line no-underscore-dangle
  const contract = new web3.eth.Contract(abi);
  const value = req.body.value;
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === 'addAllowList';
  });
  const functionArgs =
    value !== null
      ? web3.eth.abi.encodeParameters(functionAbi.inputs, value).slice(2)
      : null;
  console.log(functionArgs);
  const functionParams = {
    to: req.body.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey:users[req.body.user].privateKey,
    privateFrom: users[req.body.user].tesseraPublicKey,
    privacyGroupId: req.body.privacyGroupId,
  };
  const transactionHash = await web3.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3.priv.waitForTransactionReceipt(transactionHash);
  console.log(' value from deployed contract is: ' + result.output);
  // const decode = decodeParam(result.output);
  res.json({ result: result.output });
});

app.post('/removeAllowList', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  // eslint-disable-next-line no-underscore-dangle
  const contract = new web3.eth.Contract(abi);
  const value = req.body.value;
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === 'removeAllowList';
  });
  const functionArgs =
    value !== null
      ? web3.eth.abi.encodeParameters(functionAbi.inputs, value).slice(2)
      : null;
  console.log(functionArgs);
  const functionParams = {
    to: req.body.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: users[req.body.user].privateKey,
    privateFrom: users[req.body.user].tesseraPublicKey,
    privacyGroupId: req.body.privacyGroupId,
  };
  const transactionHash = await web3.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3.priv.waitForTransactionReceipt(transactionHash);
  console.log(' value from deployed contract is: ' + result.output);
  // const decode = decodeParam(result.output);
  res.json({ result: result.output });
});

app.post('/addRecord', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  // eslint-disable-next-line no-underscore-dangle
  const contract = new web3.eth.Contract(abi);
  const value = req.body.value;
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === 'addRecord';
  });
  const functionArgs =
    value !== null
      ? web3.eth.abi.encodeParameters(functionAbi.inputs, value).slice(2)
      : null;
  console.log(functionArgs);
  const functionParams = {
    to: req.body.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: users[req.body.user].privateKey,
    privateFrom: users[req.body.user].tesseraPublicKey,
    privacyGroupId: req.body.privacyGroupId,
  };
  const transactionHash = await web3.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3.priv.waitForTransactionReceipt(transactionHash);
  console.log(' value from deployed contract is: ' + result.output);
  // const decode = decodeParam(result.output);
  res.json({ result: result.output });
});

app.post('/getRecord', async (req, res) => {
  const url = users[req.body.user].url;
  const web3 = new Web3Quorum(
    new Web3(createHttpProvider(req.body.token, url))
  );
  // eslint-disable-next-line no-underscore-dangle
  const contract = new web3.eth.Contract(abi);
  const value = req.body.value;
  const functionAbi = contract._jsonInterface.find((e) => {
    return e.name === 'getRecord';
  });
  const functionArgs =
    value !== null
      ? web3.eth.abi.encodeParameters(functionAbi.inputs, [value]).slice(2)
      : null;
  console.log(functionArgs);
  const functionParams = {
    to: req.body.contractAddress,
    data: functionAbi.signature + functionArgs,
    privateKey: users[req.body.user].privateKey,
    privateFrom: users[req.body.user].tesseraPublicKey,
    privacyGroupId: req.body.privacyGroupId,
  };
  const transactionHash = await web3.priv.generateAndSendRawTransaction(
    functionParams
  );
  // console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3.priv.waitForTransactionReceipt(transactionHash);
  console.log(' value from deployed contract is: ' + result.output);
  const decode = decodeParamArrayString(result.output);
  res.json({ result: decode });
});
// app.get('/testdb', (req, res) => {
//   db.query(
//     `SELECT txHash from besu.TransactionHash th WHERE username ='patient1_1'`,
//     function (err, results, fields) {
//       console.log(results); // results contains rows returned by server

//     }
//   );
// });
// app.post('/test', (req, res) => {
//   console.log(req.body)
//   res.send(req.body);

// });
app.listen(PORT, () => {
  console.log(`Running on port:${PORT}`);
});
