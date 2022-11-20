const fs = require('fs');
module.exports = {
  users: {
    patient1_1: {
      url: 'http://localhost:8545',
      tesseraPublicKey: 'PFf59KI9cmuc4So9vsCVBDnRZJeRNQau1vuoftI3ezU=',
      privateKey: fs.readFileSync(
        '../../privacy-permissioned-network/Node-1/data/key',
        'utf-8'
      ).slice(2),
    },
    patient1_2: {
      url: 'http://localhost:8545',
      tesseraPublicKey: 'k+TisZyEK+LdHwku8Us/1D4Jb9Ra0WpZBK8uJK2OG3c=',
      privateKey: fs.readFileSync(
        '../../privacy-permissioned-network/Node-1/data/key',
        'utf-8'
      ).slice(2),
    },
    patient2_1: {
      url: 'http://localhost:8546',
      tesseraPublicKey: 'I6kZj+Ww0fyzVqWMQbvA6JsNO9ce4EPW0bzWw4n3Plg=',
      privateKey: fs.readFileSync(
        '../../privacy-permissioned-network/Node-2/data/key',
        'utf-8'
      ).slice(2),
    },
    patient2_2: {
      url: 'http://localhost:8546',
      tesseraPublicKey: 'HPJcShaJt11j9F0WEwdADrFrEI2wM8X4smxd+9SpDQA=',
      privateKey: fs.readFileSync(
        '../../privacy-permissioned-network/Node-2/data/key',
        'utf-8'
      ).slice(2),
    },
    patientA: {
      url: 'http://localhost:8545',
      tesseraPublicKey: 'Cz+49epNhfIayoe4vo884qi/rqDYCVoFo9BiKBJcYXk=',
      privateKey: fs.readFileSync(
        '../../privacy-permissioned-network/Node-1/data/key',
        'utf-8'
      ).slice(2),
    },
    patientB: {
      url: 'http://localhost:8546',
      tesseraPublicKey: 'qyf4ksC+eEn+pZVNROwm+N1eEsmOR+prg13lJh0Y+CM=',
      privateKey: fs.readFileSync(
        '../../privacy-permissioned-network/Node-2/data/key',
        'utf-8'
      ).slice(2),
    },
  },
};
